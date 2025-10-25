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

    console.log([req.body.roles])

})


module.exports = RoleRouter