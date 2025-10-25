const express = require('express')
const TechRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

const TechnologiesSchema = require('../schemas/TechnologiesSchema')
const db = require('../db/db')

TechRouter.get('/user-technologies', verifyToken ,async (req,res) => {

    const [ rows ] = await db.query('select * from user_technologies where user_id = ?', [req.user.userId])

    try{

        if(rows.length < 1){
            return res.status(204).json('No Technologies Yet')
        }
        
        return res.status(200).json(rows[0].user_technologies)

    }catch(err){
        return res.status(500).json('Database Error')
    }

})


TechRouter.post('/new-technologies', verifyToken, rateLimiter, async (req,res) => {
    
    

    const TechResp = TechnologiesSchema(req.body)

    if(!TechResp.success){
        return res.status(400).json('invalid input')
    }
    
    try{

        const [ rows ] = await db.query('select * from user_technologies where user_id = ?' , [req.user.userId])

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