const jwt = require('jsonwebtoken')
const db = require('../db/db')

const express = require('express')
const MyUserRouter = express.Router()
require('dotenv').config()

MyUserRouter.get('/', verifyToken , async (req,res) => {

    const userId = req.user.userId

    if(userId){

        const [ userData ] = await db.query('select user_role , user_name , user_surname, user_birthdate, user_gender from users where user_id = ?' , userId)

        return res.status(200).json({data : userData})
    }
    return res.status(401).json({error : 'no user found with this token '})

})


async function verifyToken (req,res,next) {

    const authHeader = req.headers['authorization']

    if(!authHeader){
        return res.send(400).json({erorr : 'no token provided'})
    }

    const userToken = authHeader.split(' ')[1]
    
    try {
        
        const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY)
        req.user = verifyToken

        next()

    }catch(err){
        return res.status(401).json({error: 'Invalid Token'})
    }


}

module.exports = MyUserRouter