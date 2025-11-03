const db = require('../db/db')

const express = require('express')
const UserRouter = express.Router()

require('dotenv').config()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

UserRouter.get('/my-user', verifyToken , async (req,res) => {

    if(req.user.userId){

        const [ userData ] = await db.query('select * from users where user_id = ?' , req.user.userId)

        return res.status(200).json({data : userData})
    }
    return res.status(401).json({error : 'no user found with this token '})

})


module.exports = UserRouter