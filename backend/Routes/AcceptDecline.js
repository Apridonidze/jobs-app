const express = require('express')
const verifyToken = require('../config/verifyToken')
const AcceptDeclineRouter = express.Router()
const AcceptDeclineSchema = require('../schemas/AcceptDeclineSchema')

const rateLimiter = require('../config/rateLimiter')
const db = require('../db/db')

AcceptDeclineRouter.get('/:applicant_id/:job_id', verifyToken , async (req, res) => {
      const { applicant_id, job_id } = req.params;

      await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [applicant_id, job_id])
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

        if(req.body.status === 'false') return res.status(200).json(`You Have Successfully Declined Employee`)
        return res.status(200).json(`You Have Successfully Accepted Employee`)
        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter