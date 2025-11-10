const express = require('express')
const AppliedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')



AppliedRouter.get('/my-applied-jobs', verifyToken , async (req,res) => {

    try {
        const [applied_jobs] = await db.query('SELECT * FROM applied_jobs WHERE applicant_id = ?',[req.user.userId]);

        if (applied_jobs.length === 0) return res.sendStatus(204);

        const jobIds = applied_jobs.map(job => job.job_id);
        const jobQueries = jobIds.map(jobId => db.query('SELECT * FROM jobs WHERE job_id = ?', [jobId]));
        const jobResults = await Promise.all(jobQueries);
        const jobList = jobResults.map(([rows]) => rows[0]);

        return res.status(200).json(jobList);


    } catch (err) {
        return res.status(500).json('Database Error');
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


AppliedRouter.post("/:jobId", verifyToken, async (req, res) => {
    
    try{

        const [isAlreadyApplied] = await db.query('select * from applied_jobs where job_id = ? and user_id = ?', [req.params.jobId, req.user.userId])
        
        if(isAlreadyApplied.length > 0) return res.status(200).json('You Have Applied For This Job')
            
        await db.query('insert into applied_jobs (job_id,applicant_id) values (?,?) ' , [req.params.jobId, req.user.userId])
        return res.status(200).json('Successfully Applied For Job')
        
    }catch(err){
        return res.status(500).json('Database Error')
    }

});



module.exports = AppliedRouter
