const express = require('express'); //importing express
const JobsRouter =  express.Router();  //creating route

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');
const rateLimiter  = require('../config/rateLimiter'); //importing middlewares

const JobsSchema = require('../schemas/JobsSchema'); //importing scehmas

JobsRouter.get('/job-listing', verifyToken ,async (req,res) => {

    try{
        const [ rows ] = await db.query('select * from jobs'); //gets data from database 

        if(rows.length > 0) return res.status(200).json({message: 'Jobs Found', jobs : rows}); //checks if there is any jobs in database , then returns 200 status code with job list to frotnend

        return res.status(204); //else if there is not any jobs in database , returns 204 status code to frotnend

    }catch(err){
        return res.status(500).json('Database Error');
    };
});//api is used to fetch all jobs from database to frotnend


JobsRouter.get('/user-jobs' ,verifyToken, async (req,res) => {

    try{

        const [ rows ] = await db.query('select * from jobs where user_id = ?' , [req.user.userId]); //gets data from database

        if(rows.length < 1) return res.status(200).json('No Jobs Found'); //checks if any data is found in database , then returns 200 status code if not found with mesasge

        return res.status(200).json({message : 'your jobs fetched successfully' , jobs : rows}); //else if jobs are found , servers sends 200 status code with job list to frotnend

    }catch(err){
        
        return res.status(500).json('Database Error'); //retruns 500 status code if interval error occurs
    
    };
});//api is used for fetching jobs based on recruiters id , to fetch jobs that are created by them



JobsRouter.post('/new-jobs', rateLimiter , verifyToken, async (req,res) => {

    const JobsResp = JobsSchema(req.body); //passes data down to schema to validate input

    if(!JobsResp.success) return res.status(400).json({err : 'Invalid Input'}); //if input is not validated returns 400 statsu code to frotnend
    

    const {userId} = req.user ; //sets my user id to variable
    const {title,desc,employeeList,technologies, languages } = req.body.data ; //gets all data that is needed to post new job from request

    try{
        
        await db.query('INSERT INTO jobs (user_id, job_title, job_desc, job_employeeList, job_technologies, job_languages) values (?,?,?,?,?,?)', [userId, title,desc,[JSON.stringify(employeeList)],[JSON.stringify(technologies)],[JSON.stringify(languages)]]); //inserts data to database 
        
        return res.status(200).json({message : 'Job Opportunity Created Successfully'}); //returns 200 status code to frotnend

    }catch(err){
        return res.status(500).json('Database Error');//returns 500 statsu code if internal error occurs
    };
}); //api is used for recruiter to create new job opportunity

JobsRouter.delete('/delete-job/:job_id' , verifyToken , async(req , res) => {

    try{

        await db.query('delete from accepteddeclined where job_id = ? ', [req.params.job_id]); 
        await db.query('delete from applied_jobs where job_id = ? ', [req.params.job_id]);
        await db.query('delete from jobs where job_id = ? ', [req.params.job_id]);
        await db.query('delete from saved_jobs where job_id = ? ', [req.params.job_id]);

        //servers sends delete statement to database to ddelete any related data to jobs from database 

        return res.status(200).json('Job Deleted Successfully'); //returns success message when delete is completed

    }catch(err){
        return res.status(500).json('Database Error') ; //retunrs 500 statsu code if error occurs
    };
});//api is used for recruiter to delte job opportunity

module.exports = JobsRouter; //exporting route