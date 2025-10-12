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

    console.log(req.body)

    return res.status(200).json({message : 'Valid Input'})

    //add success message here and post data into database 
})


module.exports = NewJobsRouter;