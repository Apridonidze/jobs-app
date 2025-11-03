const express = require('express')
const verifyToken = require('../config/verifyToken')
const AcceptDeclineRouter = express.Router()
const AcceptDeclineSchema = require('../schemas/AcceptDeclineSchema')

const rateLimiter = require('../config/rateLimiter')
const db = require('../db/db')



AcceptDeclineRouter.get('/my-applicants/:job_id' , verifyToken , async(req,res) => {
    
    try{
        const [ rows ]= await db.query('select * from AcceptedDeclined where job_id = ?' , [req.params.job_id])

    if(rows.length < 1){
        
        return res.status(200).json({message : 'No Applicants Yet', data : rows[0] , applicant: applicant[0]})

    }

    const [ applicant ] = await db.query('select * from users where user_id = ?' , [rows[0].applicant_id])

    if(rows.status === 'true')return res.status(200).json({message : 'You Have Already Accepted This Employee', data : rows[0] , applicant: applicant[0]})
    return res.status(200).json({message : 'You Have Already Accepted This Employee', data : rows[0], applicant : applicant[0]})
    
    

    }catch(err){
        return res.status(500).json('Database Error')
    }
    
    
})

AcceptDeclineRouter.get('/:applicant_id/:job_id', verifyToken , async (req, res) => {
    
    const { applicant_id, job_id } = req.params;

    const [ rows ]= await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [applicant_id, job_id])

    if(rows.length < 1){
        return res.status(200).json({message : 'You Have Not Responded To This Employee Yet', status : true})
    }

    if(rows.status === 'true')return res.status(200).json({message : 'You Have Already Accepted This Employee', status : true})
    return res.status(200).json({message : 'You Have Already Accepted This Employee', status : false})

})


AcceptDeclineRouter.post('/accept-decline-employee', rateLimiter , verifyToken , async(req,res) => {

    const AcceptDeclineResep = AcceptDeclineSchema(req.body)

        if(!AcceptDeclineResep.success){
            return res.status(400).json('Invalid Input')
        }


    try{

        const [ rows ] = await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [req.body.applicant_id , req.body.job_id])
        

        if(rows.length > 1){

            return res.status(200).json('already sended response to this employee')

        }

        await db.query('insert into AcceptedDeclined (job_id, applicant_id , status, recruiter_id) values (? , ? , ? , ?)' , [req.body.job_id, req.body.applicant_id , req.body.status , req.user.userId])

        if(req.body.status === 'false') return res.status(200).json({message : `You Have Successfully Declined Employee` , status : req.body.status})
        return res.status(200).json({message : `You Have Successfully Accepted Employee` , status : req.body.status})
        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter