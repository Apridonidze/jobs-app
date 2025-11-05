const express = require('express')
const SavedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

SavedRouter.get('/my-saved-jobs', verifyToken, async(req,res) => {

    try{

        const [ SavedJobs ] = await db.query('select * from saved_jobs where user_id = ? ' , [req.user.userId])

        if(SavedJobs.length < 1){
            return res.status(204).json('no jobs saved yet')
        }
        return res.status(200).json(SavedJobs)


    }catch(err){
        return res.status(500).json(`Database Error`)
    }
})

SavedRouter.post('/post-my-saved-jobs',verifyToken , async (req,res) => {

    try{
        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

    if(JobsRow.length > 0){

        const [ isSaved ] = await db.query('select * from saved_jobs where job_id = ?' , [req.body.job_id ])

        if(isSaved.length < 1){
            await db.query('insert into saved_jobs (job_id) values (?)' , [req.body.job_id])
            return res.status(200).json({message : 'Job Saved Successfully' , status : true})
        }

        return res.status(200).json({message : 'You Have Already Saved This Job' , status : false})


    }

    }catch(err){
        return res.status(500).json('Database Error')
    }

})

//add delete statement


module.exports = SavedRouter