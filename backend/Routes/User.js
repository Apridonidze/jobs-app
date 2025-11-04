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

UserRouter.get('/user/:userId' , async (req,res) => {

    try{
        
        const [ user ] = await db.query('select * from users where user_id = ?' , [req.params.userId])

        if(user.length > 0){
            
            const [ user_avatar ] = await db.query('select * from user_avatar where user_id = ?', [req.params.userId])
            const [ user_desc ] = await db.query('select * from user_des where user_id = ?', [req.params.userId])
            const [ user_roles ] =  await db.query('select * from user_roles where user_id = ?', [req.params.userId])
            const [ user_technologies ] =  await db.query('select * from user_technologies where user_id = ?', [req.params.userId])

            console.log([user_avatar, user_desc , user_roles, user_technologies])
            return res.status(200).json('User Found')
        }

        return res.status(400).json('No User Found')

    }catch(err){
        return res.status(500).json('Internal Error')
    }

})


module.exports = UserRouter