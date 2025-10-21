const express = require('express')
const isProfileFinishedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

isProfileFinishedRouter.get('/', verifyToken , async (req,res) => {


        const [ user ] = await db.query('select * from users where user_id = ?',[req.user.userId])
        
        const [ hasRole ] = await db.query('select * from user_roles where user_id = ?',[req.user.userId])
        const [ hasTags ] = await db.query('select * from user_tags where user_id = ?',[req.user.userId])
        const [ hasTechnologies ] = await db.query('select * from user_technologies where user_id = ?',[req.user.userId])
        const [ hasAvatar ] = await db.query('select * from user_avatar where user_id = ?',[req.user.userId])
        const [ hasDesc ] = await db.query('select * from user_des where user_id = ?',[req.user.userId])

        try{
            
            if(req.user.userRole === 'Recruiter'){
                if(hasAvatar.length > 0 && hasDesc.length > 0 && hasTags.length > 0){
                    return res.status(200).json({message : 'Profile is Finished', code : true})
                }
                return res.status(200).json({message : 'Profile is Not Finished', code : false})
            }

            if(req.user.userRole === 'Employee'){

                if(hasAvatar.length > 0 && hasDesc.length > 0 && hasTags.length > 0 && hasRole.length > 1 && hasTechnologies.length > 0){
                    return res.status(200).json({message : 'Profile is Finished', code : true})
                }
                return res.status(200).json({message : 'Profile is Not Finished', code : false})

            }

        }catch(err){

        return res.status(500).json('Database Error')

    }

})



module.exports = isProfileFinishedRouter