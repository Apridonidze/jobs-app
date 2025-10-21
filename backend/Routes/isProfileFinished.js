const express = require('express')
const isProfileFinishedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

isProfileFinishedRouter.get('/', verifyToken , async (req,res) => {

    try{
        
        const [ hasRole ] = await db.query('select * from user_roles where user_id = ?',[req.user.userId])
        const [ hasTags ] = await db.query('select * from user_tags where user_id = ?',[req.user.userId])
        const [ hasTechnologies ] = await db.query('select * from user_technologies where user_id = ?',[req.user.userId])
        const [ hasAvatar ] = await db.query('select * from user_avatar where user_id = ?',[req.user.userId])
        const [ hasDesc ] = await db.query('select * from user_des where user_id = ?',[req.user.userId])


        if(hasRole.length > 1 && hasTags.length > 1 && hasTechnologies.length > 1 && hasAvatar.length > 1 && hasDesc.length > 1){
            return res.status(200).json('User Profile is Finished')
        }
            
        return res.status(200).json('User Profile is not Finished')
        

    }catch(err){

        return res.status(500).json('Database Error')

    }

})



module.exports = isProfileFinishedRouter