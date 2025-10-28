const express = require('express')
const SavedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

SavedRouter.get('/', (req,res) => {
    //verify token 
    //fetch data based on req.user.userId
    //if there is not any data return 400 status code
})

SavedRouter.post('/post-my-saved-jobs',verifyToken , async (req,res) => {

    try{
        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

    if(JobsRow.length > 0){

        const [ isSaved ] = await db.query('select * from saved_jobs where job_id = ?' , [req.body.job_id ])

        if(isSaved.length < 1){
            await db.query('insert into saved_jobs (job_id) values (?)' , [req.body.job_id])
            return res.status(200).json('Saved')
        }

        return res.status(200).json('You Have Already Saved This Job')


    }

    }catch(err){
        return res.status(500).json('Database Error')
    }

})

//add delete statement


module.exports = SavedRouter