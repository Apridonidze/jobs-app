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

        
        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

        if(JobsRow.length > 0){

            const [ isApplied ] = await db.query('select * from applied_jobs where job_id = ? and applicant_id = ?' , [req.body.job_id , req.user.userId])
            console.log(isApplied)
            if(isApplied.length > 0){
                return res.status(200).json('You Already Applied For This Job')
            }

            await db.query('insert into applied_jobs (job_id, user_id, applicant_id) values (?,?,?)' , [req.body.job_id , req.body.user_id, req.user.userId ])
            return res.send('inserted')
        }

        return res.status(400).json('Could Not Apply For Job')

    }catch(err){
        console.log(err)
    }
            
        

    
 //check user token
 //if job exists
 //pushinto table
})


module.exports = AppliedRouter