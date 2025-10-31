const express = require('express')
const AppliedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')
const { watchFile } = require('fs')

AppliedRouter.get('/my-applied-jobs', verifyToken , async (req,res) => {
    console.log(req.body)
    //check if user aplied for jos baed on their token
    //return no jobs found if there is not rovs
    //else return jobs user has applied and status form recuiter /not checked yet // seen user // acceped user //denied user
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

        

        return res.status(204).json('No Jobs Created Yet')

    }catch(err){
        console.log(err)
    }

    //get applied jobs wher euser id = req.user.userId
    //get user from table where applied_job's applicant user id 

    //at the end send full job that is crated by recruiter with applicants account's

    
})

AppliedRouter.post('/post-my-applied-jobs',verifyToken , async (req,res) => {

    try{

        
        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

        if(JobsRow.length > 0){

            const [ isApplied ] = await db.query('select * from applied_jobs where job_id = ? and applicant_id = ?' , [req.body.job_id , req.user.userId])
            console.log(isApplied)
            if(isApplied.length > 0){
                return res.status(200).json('You Already Applied For This Job')
            }

            await db.query('insert into applied_jobs (job_id, user_id, applicant_id) values (?,?,?)' , [req.body.job_id , req.body.user_id, req.user.userId ])
            return res.send('inserted')
        }

        return res.status(400).json('Could Not Apply For Job')

    }catch(err){
        console.log(err)
    }
            
        

    
 //check user token
 //if job exists
 //pushinto table
})


module.exports = AppliedRouter