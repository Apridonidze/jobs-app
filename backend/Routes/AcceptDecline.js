const express = require('express')
const verifyToken = require('../config/verifyToken')
const AcceptDeclineRouter = express.Router()
const AcceptDeclineSchema = require('../schemas/AcceptDeclineSchema')

const rateLimiter = require('../config/rateLimiter')
const db = require('../db/db')

AcceptDeclineRouter.get('/', (req, res) => {
    res.send('accept or decline default path')
})


AcceptDeclineRouter.post('/accept-decline-employee', rateLimiter , verifyToken , async(req,res) => {

    const AcceptDeclineResep = AcceptDeclineSchema(req.body)

        if(!AcceptDeclineResep.success){
            return res.status(400).json('Invalid Input')
        }

    try{

        const [ rows ] = await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [req.body.applicant_id , req.body.job_id])
        

        if(rows.length > 1){

            console.log('you already sent status to this user') // add status code

        }

        await db.query('insert into AcceptedDeclined (job_id, applicant_id , status) values (?,?,?)' , [req.body.job_id, req.body.applicant_id , req.body.status])

        console.log('response sended to database')
        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter