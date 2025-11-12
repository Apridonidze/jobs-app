const express = require('express')
const AppliedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')



AppliedRouter.get('/my-applied-jobs', verifyToken , async (req,res) => {

    try {
        const [applied_jobs] = await db.query('select * from applied_jobs where applicant_id = ?',[req.user.userId]);

        if (applied_jobs.length === 0) return res.sendStatus(204);

        const jobIds = applied_jobs.map(job => job.job_id);
        const jobQueries = jobIds.map(jobId => db.query('select * from jobs where job_id = ?', [jobId]));
        const jobResults = await Promise.all(jobQueries);
        const jobList = jobResults.map(([rows]) => rows[0]);


        return res.status(200).json(jobList);


    } catch (err) {
        return res.status(500).json('Database Error');
    }

})



AppliedRouter.post("/:jobId", verifyToken, async (req, res) => {
    
    try{

        const [isAlreadyApplied] = await db.query('select * from applied_jobs where job_id = ? and applicant_id = ?', [req.params.jobId, req.user.userId])
        
        if(isAlreadyApplied.length < 1){
            await db.query('insert into applied_jobs (job_id, applicant_id) values (? , ?) ' , [req.params.jobId, req.user.userId])
        return res.status(200).json('Successfully Applied For Job') 
        }

        return res.status(200).json('You Have Applied For This Job')
            
        
        
    }catch(err){
        return res.status(500).json('Database Error')
    }

});



module.exports = AppliedRouter
