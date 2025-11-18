const express = require('express');//importing  express
const AppliedRouter = express.Router(); //creating express route 

const db = require('../db/db'); //importing db middleware
const verifyToken = require('../config/verifyToken'); //importing token validaiton middelware

AppliedRouter.get('/my-applied-jobs', verifyToken , async (req,res) => {

    try {

        const [applied_jobs] = await db.query('select * from applied_jobs where applicant_id = ?',[req.user.userId]); //gets data from database 

        if (applied_jobs.length === 0) return res.sendStatus(204); //checks fetched data length , if data.length === 0 then it returns 204 status code response to frotnend

        const jobIds = applied_jobs.map(job => job.job_id); //maps job ids 
        const jobQueries = jobIds.map(jobId => db.query('select * from jobs where job_id = ?', [jobId])); //sending queries to database and fetching database based on mapped jobids
        const jobResults = await Promise.all(jobQueries); //awaits for response
        const jobList = jobResults.map(([rows]) => rows[0]); //gets final data and sets in variable

        return res.status(200).json(jobList); //sending response to frotned

    } catch (err) {
        return res.status(500).json('Database Error');//sending 500 status code response to frotnend ifinternal erro occurs
    };
});//api if used for getting applied jobs for my user

AppliedRouter.post("/:jobId", verifyToken, async (req, res) => {
    
    try{

        const [isAlreadyApplied] = await db.query('select * from applied_jobs where job_id = ? and applicant_id = ?', [req.params.jobId, req.user.userId]); //gets data from database 
        
        if(isAlreadyApplied.length < 1){
            await db.query('insert into applied_jobs (job_id, applicant_id) values (? , ?) ' , [req.params.jobId, req.user.userId]);
            return res.status(200).json('Successfully Applied For Job') ;
        };//checks length of queries and if length is less than 1 , statement sends query to database and returns response to frotyned

        return res.status(200).json('You Have Applied For This Job'); //else it sends response to frotnnd that use ralready applied  for job
        
    }catch(err){
        return res.status(500).json('Database Error'); //returning 500 status code if internal error occurs
    };

});

module.exports = AppliedRouter; //exporting route
