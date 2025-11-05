const express = require('express')
const AppliedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

AppliedRouter.get('/my-applied-jobs', verifyToken , async (req,res) => {

    try{

        const [ applied_jobs ] = await db.query('select * from applied_jobs where applicant_id = ? ', [req.user.userId])

        if(applied_jobs.length > 0){
            for(let i = 0 ; i < applied_jobs.length ; i++){
                const [job_data] = await db.query('select * from jobs where job_id = ? ', applied_jobs[i].job_id)

                if(job_data.length === 0)return res.status(204)

                const [ user_data ] = await db.query('select * from users where user_id = ? ' ,[req.user.userId])
                return res.status(200).json({Job: job_data, user : user_data , status: true})
            }
            
        }
        return res.status(204)
        
    }catch(err){
        return res.status(500).json('Database Error')
    }

})


AppliedRouter.get('/my-applicants' , verifyToken , async(req,res) => {
    try{

        const [ Jobs ] = await db.query('select * from applied_jobs where user_id = ?', [req.user.userId])

        if( Jobs ){

            
            for(let i = 0 ; i < Jobs.length ; i++){

                const [ Applicants ] = await db.query('select * from users where user_id =? ', [Jobs[i].applicant_id])
                const [MyJobs]  = await db.query('select * from jobs where user_id = ?' ,[Jobs[i].user_id])

                if(Applicants.length){
                    
                return res.status(200).json({job: MyJobs , applicants : Applicants})
                }

                return res.status(200).json({job : MyJobs ,Applicants : 'No Applicants Yet'})

            }

            
        }

        return res.status(200).json('No Applicants Found')

    }catch(err){
        console.log(err)
    }
    
})



AppliedRouter.post('/post-my-applied-jobs',verifyToken , async (req,res) => {

    try{

        
        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

        if(JobsRow.length > 0){

            const [ isApplied ] = await db.query('select * from applied_jobs where job_id = ? and applicant_id = ?' , [req.body.job_id , req.user.userId])
            
            if(isApplied.length > 0){
                return res.status(200).json({message: 'You Already Applied For This Job' , status : false})
            }

            await db.query('insert into applied_jobs (job_id, user_id, applicant_id) values (?,?,?)' , [req.body.job_id , req.body.user_id, req.user.userId ])
            return res.status(200).send({message: 'Successfully Applied' , status : false})
        }

        return res.status(400).json('Could Not Apply For Job')

    }catch(err){
        console.log(err)
    }
            
})


module.exports = AppliedRouter