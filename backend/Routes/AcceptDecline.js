const express = require('express'); //importing express
const AcceptDeclineRouter = express.Router(); //creating express route 

const db = require('../db/db'); //importing database middleware
const AcceptDeclineSchema = require('../schemas/AcceptDeclineSchema') ; //importing schema for this route
const verifyToken = require('../config/verifyToken') ; //importing token validation middleware




AcceptDeclineRouter.get('/my-applicants/:job_id' , verifyToken , async(req,res) => {

    const [ checkJob ] = await db.query('select * from jobs where job_id = ? and user_id = ? ' , [req.params.job_id , req.user.userId]); //gets all jobs from database
    
    if(checkJob.length < 1) return res.status(404); //checks if job exists in database to avoid errors when user will try to communicate with non-existant job

    const [ Applicants ] = await db.query('select * from applied_jobs where job_id = ?', [req.params.job_id]); //fetcehd applicants for this job

    if(Applicants.length < 1) return res.status(200).json([]); //if this job does not have any applicants it returns empty array with 200 status code

    const applicantIds = Applicants.map(applicant => applicant.applicant_id); //maps applicant list
    const applicantQueries = applicantIds.map(applicantId => db.query('select user_id ,user_name ,user_surname from users where user_id = ? ' , [applicantId]));//sends queries to database to fetch this users from database 
    const applicantResults = await Promise.all(applicantQueries);//awaits for response
    const filteredUsers = applicantResults.filter(Boolean); //filters response where we get any type of boolean
    const applicantLists = filteredUsers.map(filteredUser => filteredUser[0][0]); //sets final data to applicantLists

    const technologiesQueries = applicantIds.map(applicantId => db.query('select * from user_technologies where user_id = ?',[applicantId])); //sends queries to database to fetch technologies based on this users ids
    const technologiesResults = await Promise.all(technologiesQueries); //awaits for response
    const filteredTechnologies = technologiesResults.map(([AT]) => AT[0] ?? []  );//sets final data to technologiesLists , if any of the employee does not have technologies it returns empty array for them
    
    const rolesQueries = applicantIds.map(applicantId => db.query('select * from user_roles where user_id = ?' , [applicantId]));//sends queries to database to fetch applicant's roles from database
    const rolesResults = await Promise.all(rolesQueries); //awaits for response
    const filteredRoles = rolesResults.map(([R]) => R[0] ?? []  ); //sets response data to filteredRoles , if any of the applicant does not have roles it returns empty array

    const statusQueris = applicantIds.map(applicantId => db.query('select * from accepteddeclined where applicant_id = ? and job_id = ?' , [applicantId , req.params.job_id]));//fetches status from database (if user is applied or declined for this job)
    const statusResults = await Promise.all(statusQueris);//awaits for response
    const filteredStatus = statusResults.map(([S]) => S[0] ?? []); //sets response data to filteredStatus , if we cant get response then server returns empty array

    const data = (applicantLists.map(applicant => ({applicant : applicant , technologies : filteredTechnologies.filter(technologies => technologies.user_id === applicant.user_id ?? []) , roles : filteredRoles.filter(roles => roles.user_id === applicant.user_id ?? []) , status : filteredStatus.filter(status => status.applicant_id === applicant.user_id ?? [])}))); //wraps all data into one variable to send to frontned
    console.log(data)
    return res.status(200).json(data);//returns response to frontned

}); //api is used for recruiter to fetch applicant for specifitc job and see data about them and also status if he already accepted or declined applicant

AcceptDeclineRouter.get('/:jobId', verifyToken , async (req, res) => {

    try{
        const [ applicantsStatus ] = await db.query('select * from accepteddeclined where job_id = ? and applicant_id = ?' , [req.params.jobId , req.user.userId]); //gets applciant status for specific job 

        return res.status(200).json(applicantsStatus[0]); //retruns to server , (if we cant get their status server sends empty array automatically so there is no need to handle this type of problkem)

    }catch(err){
        return res.status(500).json('Database Error'); //returns database error if internal error occurs
    };
}); //api is used to get job status basedd on jobid

AcceptDeclineRouter.post('/accept-decline-employee/:jobId/:applicantId/:status' , verifyToken , async(req,res) => {

    const data = {applicant_id : Number(req.params.applicantId),
                    job_id : Number(req.params.jobId),
                    status : Boolean(req.params.status)
    }; //gets data form api params , sets them in object and transformes their types from string to Number and Boolean


    const AcceptDeclineResep = AcceptDeclineSchema(data); //passes data to schema to validate input

        if(!AcceptDeclineResep.success){

            return res.status(400).json('Invalid Input');
        
        };//if schema does not success input server returns error to frontend


    try{

        const [ rows ] = await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [req.params.applicantId, req.params.jobId]); //fetces data from accepteddeclined table and stores in rows array

        if(rows.length >= 1){

            return res.status(200).json('already sended response to this employee')

        };//if rows legnth is greater than 1 that means recuriter already respondede to applicant and sends status code to frontend

        //else it executes this logic

        await db.query('insert into AcceptedDeclined (job_id, applicant_id , status, recruiter_id) values (? , ? , ? , ?)' , [req.params.jobId, req.params.applicantId, req.params.status, req.user.userId]); //inserts data into table

        if(req.body.status === 'false') return res.status(200).json({message : `You Have Successfully Declined Employee` , status : req.params.status}); //gets data from request and checks if statsu code is fa lse and returns response to frontend that backend recieved data

        return res.status(200).json({message : `You Have Successfully Accepted Employee` , status : req.params.status});//gets data from request and returns response to frontend
        

    }catch(err){

        return res.status(500).json(`Database Error`); //returns 500 status code if internal error occurs
    };

});//api is used to sends applicant status as a recruiter if i accept their offer or decline

module.exports = AcceptDeclineRouter; //exporting route