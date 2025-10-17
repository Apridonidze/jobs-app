const express = require('express')
const JobsRouter =  express.Router()

const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

JobsRouter.get('/', async (req,res) => {

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



module.exports = JobsRouter