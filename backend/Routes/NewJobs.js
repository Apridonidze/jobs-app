const express = require('express')
const NewJobsRouter = express.Router()

const JobsSchema = require('../schemas/JobsSchema')
const verifyToken = require('../config/verifyToken')
NewJobsRouter.get('/', (req,res) => {
    res.send('new jobs path')
})


NewJobsRouter.post('/', verifyToken, (req,res) => {

    
    const JobsResp = JobsSchema(req.body)

    if(!JobsResp.success){
        return res.status(400).json('Invalid Input')
    }

    //add success message here and post data into database 
})


module.exports = NewJobsRouter;