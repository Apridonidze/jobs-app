const express = require('express')
const RoleRouter = express.Router()

const RoleSchema = require('../schemas/RoleSchema')
const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

RoleRouter.get('/my-roles' , (req, res) => {
    res.send('role router default path')
})


RoleRouter.post('/upload-roles' , verifyToken  , rateLimiter , async(req,res) => {

    const roleResp = RoleSchema(req.body)
    
    if(!roleResp.success){
        return res.status(400).json('invalid input')
    }

    try{

        const [ rows ] = await db.query('select * from user_roles where user_id = ?',[req.user.userId])

    }catch(err){
        return res.status(500).json('Database Error')
    }

})


module.exports = RoleRouter