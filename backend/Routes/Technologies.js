const express = require('express')
const TechRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

const TechnologiesSchema = require('../schemas/TechnologiesSchema')
const db = require('../db/db')

TechRouter.get('/user-technologies', (req,res) => {
    res.send('/technologies path')
})


TechRouter.post('/new-technologies', verifyToken, rateLimiter, async (req,res) => {
    const TechResp = TechnologiesSchema(req.body)

    if(!TechResp.success){
        return res.status(400).json('invalid input')
    }
    
    try{

        const [ rows ] = await db.query('select * from ')

        //if rows.length < 1 send insert query
        //if rows.length > 1 send update query

    }

    catch(err){
        return res.status(500).json({err : 'Database Error'})
    }
    

})



module.exports = TechRouter