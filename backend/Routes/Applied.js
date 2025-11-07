const express = require('express')
const AppliedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

AppliedRouter.get('/my-applied-jobs', verifyToken , async (req,res) => {

    try{
        
        const [ applied_jobs ] = await db.query('select * from applied_jobs where applicant_id = ? ', [req.user.userId])

        if(applied_jobs.length < 1) return res.status(204).send('No Applied Jobs Yet.')
            
        const jobIds = applied_jobs.map(j => j.job_id)
            
        const jobs = jobIds.map(id => 
            db.query('select * from jobs where job_id = ?',[id])
        )

        const jobResults = await Promise.all(jobs)
        const jobData = jobResults.map(job => job[0][0])

        return res.status(200).json(jobData)

    }catch(err){
        return res.status(500).json('Database Error')
    }
})

AppliedRouter.get('/check-applied/:jobId' , verifyToken, async(req ,res) => {
    
    const [isApplied] = await db.query('select * from applied_jobs where job_id = ? and applicant_id = ?', [req.params.jobId , req.user.userId])
    console.log(isApplied)

    if(isApplied.length < 1) return res.status(200).json(false)

    
    return res.status(200).json(true)
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