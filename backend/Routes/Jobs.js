const express = require('express')
const JobsRouter =  express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')
const rateLimiter  = require('../config/rateLimiter')

JobsRouter.get('/job-listing', verifyToken ,async (req,res) => {

    const [ rows ] = await db.query('select * from jobs')

    if(rows.length > 0) {
        return res.status(200).json({message: 'Jobs Found', jobs : rows})
    }

    return res.status(400).json({error : 'No Jobs Found Yet'})

})

JobsRouter.get('/user-jobs' ,verifyToken, async (req,res) => {

    try{

        const [ rows ] = await db.query('select * from jobs where user_id = ?' , [req.user.userId])

        if(rows.length < 1) return res.status(400).json({error : 'no jobs found'})

        return res.status(200).json({message : 'your jobs fetched successfully' , jobs : rows})

    }catch(err){
        
        return res.status(500).json({error : 'error'})
    
    }

})

JobsRouter.post('/new-jobs', rateLimiter,verifyToken, async (req,res) => {


    const JobsResp = JobsSchema(req.body)

    if(!JobsResp.success){
        return res.status(400).json({err : 'Invalid Input'})
    }

    const {title,desc,employeeList,technologies, languages } = req.body 
    const {userId} = req.user

    try{
        
        await db.query('INSERT INTO jobs (user_id, job_title, job_desc, job_employeeList, job_technologies, job_languages) values (?,?,?,?,?,?)', [userId, title,desc,[JSON.stringify(employeeList)],[JSON.stringify(technologies)],[JSON.stringify(languages)]])
        
        return res.status(200).json({message : 'Job Opportunity Created Successfully'})


    }catch(err){
        return res.status(500).json('Database Error')
    }

})



module.exports = JobsRouter