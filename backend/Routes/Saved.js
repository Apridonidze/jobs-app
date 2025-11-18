const express = require('express'); //importin express
const SavedRouter = express.Router(); //creating route

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');//importing middlewares

SavedRouter.post('/:jobId', verifyToken , async (req,res) => {

    try{

        const [isAlreadySaved] = await db.query('select * from saved_jobs where job_id = ? and user_id = ?', [req.params.jobId, req.user.userId]); //gets data from database
        
        if(isAlreadySaved.length > 0) return res.status(200).json('You Have Already Saved This Job');//checks if data is not empty and returns 200 stasu code that employee already saved job

            
        await db.query('insert into saved_jobs (job_id,user_id) values (?,?) ' , [req.params.jobId, req.user.userId]); //else sends insertin statement to database to save job 
        return res.status(200).json('Successfully Saved Job'); //sends 200 status code to frotnend
        
    }catch(err){
        return res.status(500).json('Database Error');//returns 500 status code if internal error occurs
    };
}); //api is used for employee to save saved jobs in database


SavedRouter.get('/my-saved-jobs', verifyToken, async(req,res) => {

    try{

        const [ Saved ] = await db.query('select * from saved_jobs where user_id = ?' , [req.user.userId]); //gets data from databaase
        
        if(Saved.length === 0) return res.status(204);//checks if data is not empty , if so server returns 204 status code to frotned

        const savedId = Saved.map(s => s.job_id);//maps saved jobs ids
        const jobs = savedId.map(id => db.query('select * from jobs where job_id = ?',[id])); //sends queries based on saved jobs idds
        const jobResults = await Promise.all(jobs); //awaits for response
        const jobData = jobResults.map(job => job[0][0]); //sends final result in variable to make ready for frotned

        return res.status(200).json(jobData)//sends 200 status code to frotnend with saved job lists
        
    }catch(err){
        return res.status(500).json('Database Error'); //sends 500 staus code to frotend if internal error occurs
    };
});

module.exports = SavedRouter;//exporting route