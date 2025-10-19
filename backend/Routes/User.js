const db = require('../db/db')

const express = require('express')
const UserRouter = express.Router()

require('dotenv').config()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

UserRouter.get('/my-user', verifyToken , async (req,res) => {

    const userId = req.user.userId

    if(userId){

        const [ userData ] = await db.query('select user_role , user_name , user_surname, user_birthdate, user_gender from users where user_id = ?' , userId)

        return res.status(200).json({data : userData})
    }
    return res.status(401).json({error : 'no user found with this token '})

})




module.exports = UserRouter