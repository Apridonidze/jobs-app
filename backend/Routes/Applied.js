const express = require('express')
const AppliedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

AppliedRouter.get('/my-applied-jobs', (req,res) => {
    console.log(req.body)
    //integrate beriftytoken
    //check if user aplied for jos baed on their token
    //return no jobs found if there is not rovs
    //else return jobs user has applied and status form recuiter /not checked yet // seen user // acceped user //denied user
})
AppliedRouter.post('/post-my-applied-jobs',verifyToken , async (req,res) => {

    try{

        //{ job_id: 3, user_id: 76 }

        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

        if(JobsRow.length >= 1){
            
            await db.query('insert into applied_jobs (job_id, user_id, applicant_id) values (?,?,?)' , [req.body.job_id , req.body.user_id, req.user.userId ])
        }

        return res.status(400).json('Invalid Job Apply')


    }catch(err){
        console.log(err)
    }
            
        

    
 //check user token
 //if job exists
 //pushinto table
})


module.exports = AppliedRouter