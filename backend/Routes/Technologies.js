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

        const [ rows ] = await db.query('select * from user_technologies')

        if(rows.length < 1){

            await db.query('insert into user_technologies (user_id,user_technologies) values (?,?)', [req.user.userId, JSON.stringify(req.body.technologies)])
            
            return res.status(200).json('Technologies Uploaded Successfully')
            
        }

        await db.query('update user_technologies set user_technologies = ? where user_id = ?' , [JSON.stringify(req.body.technologies),req.user.userId])
    
        return res.status(200).json('Technologies Updated Successfully')
    
    }

    catch(err){
        return res.status(500).json({err : 'Database Error'})
    }
    

})



module.exports = TechRouter