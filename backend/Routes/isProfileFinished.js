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
        

        console.log([hasRole.length >= 1, hasTags.length >= 1,hasTechnologies.length >= 1, hasAvatar.length >= 1, hasDesc.length >= 1])
        if(req.user.userRole == 'recruiter'){

            
            if(hasAvatar.length > 0 && hasDesc.length > 0 && hasTags.length > 0){
                
                return res.status(200).json(true)
            
            }
            return res.status(200).json(false)

        }

         if(req.user.userRole == 'employee'){

            if(hasAvatar.length >= 1 && hasDesc.length >= 1 && hasTags.length >= 1 && hasRole.length  >= 1 && hasTechnologies.length >= 1 ){
                    
                return res.status(200).json(true)
            }

            return res.status(200).json(false)

        }

           

        }catch(err){

            return res.status(500).json(`database error : ${err}`)
        
        }

})



module.exports = isProfileFinishedRouter