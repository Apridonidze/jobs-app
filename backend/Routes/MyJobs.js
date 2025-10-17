const express = require('express')
const MyJobsRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

MyJobsRouter .get('/' ,verifyToken, async (req,res) => {

    try{

        const [ rows ] = await db.query('select * from jobs where user_id = ?' , [req.user.userId])

        if(rows.length < 1) return res.status(400).json({error : 'no jobs found'})

        return res.status(200).json({message : 'your jobs fetched successfully' , jobs : rows})

    }catch(err){
        
        return res.status(500).json({error : 'error'})
    
    }

})



module.exports = MyJobsRouter 