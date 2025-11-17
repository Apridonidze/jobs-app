const express = require('express')
const RoleRouter = express.Router()

const db = require('../db/db')
const RoleSchema = require('../schemas/RoleSchema')
const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')




RoleRouter.get('/my-roles' , verifyToken ,  async(req, res) => {

    try{

        const [ rows ] = await db.query('select * from user_roles where user_id = ?' , [req.user.userId])

        if(rows.length < 1){
            return res.status(204).json("No Roles Yet")
        }

        return res.status(200).json(rows)

    }catch(err){
        return res.status(500).json('Database Error')
    }

})


RoleRouter.post('/upload-roles' , verifyToken  , rateLimiter , async(req,res) => {

    const RoleResp = RoleSchema(req.body)

    if(!RoleResp.success){
        return res.status(400).json('invalid input')
    }
    
    try{

        const [ rows ] = await db.query('select * from user_roles where user_id = ?' , [req.user.userId])

        if(rows.length < 1){

            await db.query('insert into  user_roles (user_id,user_roles) values (?,?)', [req.user.userId, JSON.stringify(req.body.roles)])
            
            return res.status(200).json('Technologies Uploaded Successfully')
            
        }

        await db.query('update user_roles set user_roles = ? where user_id = ?' , [JSON.stringify(req.body.roles),req.user.userId])
    
        return res.status(200).json('Technologies Updated Successfully')
    
    }

    catch(err){
        return res.status(500).json({err : 'Database Error'})
    }
    

})


module.exports = RoleRouter