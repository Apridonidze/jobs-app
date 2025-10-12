const express = require('express')
const NewJobsRouter = express.Router()

const db = require('../db/db')

const JobsSchema = require('../schemas/JobsSchema')
const verifyToken = require('../config/verifyToken')


NewJobsRouter.get('/', (req,res) => {
    res.send('new jobs path')
})


NewJobsRouter.post('/', verifyToken, async (req,res) => {


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


module.exports = NewJobsRouter;