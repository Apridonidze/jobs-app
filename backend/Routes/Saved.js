const express = require('express')
const SavedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

SavedRouter.get('/my-saved-jobs', verifyToken, async(req,res) => {

    try{

        
        const [ Saved ] = await db.query('select * from saved_jobs where user_id = ?' , [req.user.userId])
        
        if(Saved.length === 0) return res.status(204).send('No Saved Jobs Yet.')

        const savedId = Saved.map(s => s.job_id)


        const jobs = savedId.map(id => 
            db.query('select * from jobs where job_id = ?',[id])
        )

        const jobResults = await Promise.all(jobs)
        const jobData = jobResults.map(job => job[0][0])


        return res.status(200).json(jobData)


         
        
    }catch(err){
        return res.status(500).json('Database Error')
    }
})

SavedRouter.get('/check-job/:jobId' , verifyToken , async (req, res) => {


    try{
        const [isSaved] = await db.query('select * from saved_jobs where job_id = ? and user_id = ?', [req.params.jobId , req.user.userId])

        if(isSaved.length < 1) return res.status(200).json(false)
        
        return res.status(200).json(true)
            
    }catch(err){
        return res.status(500).json('Database Error')
    }

})

SavedRouter.post('/post-my-saved-jobs',verifyToken , async (req,res) => {

    try{
    const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

    if(JobsRow.length > 0){

        const [ isSaved ] = await db.query('select * from saved_jobs where job_id = ?' , [req.body.job_id ])
        const [ user ] = await db.query('select * from users where user_id = ?', [req.user.userId])

        if(isSaved.length < 1){
            await db.query('insert into saved_jobs (job_id, user_id) values (?, ?)' , [req.body.job_id , req.user.userId])
            return res.status(200).json({message : 'Job Saved Successfully' , status : true , user: user})
        }

        return res.status(200).json({message : 'You Have Already Saved This Job' , status : false, user: user})


    }

    }catch(err){
        return res.status(500).json('Database Error')
    }

})

//add delete statement


module.exports = SavedRouter