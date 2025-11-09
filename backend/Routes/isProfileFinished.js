const express = require('express')
const isProfileFinishedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')



const cors = require('cors')
const corsOptions = require('../config/corsOptions')
isProfileFinishedRouter.use(cors(corsOptions))


isProfileFinishedRouter.get('/', verifyToken , async (req,res) => {
    
    
    try{

        
        const [ hasRole ] = await db.query('select * from user_roles where user_id = ?',[req.user.userId])
        const [ hasTags ] = await db.query('select * from user_tags where user_id = ?',[req.user.userId])
        const [ hasTechnologies ] = await db.query('select * from user_technologies where user_id = ?',[req.user.userId])
        const [ hasAvatar ] = await db.query('select * from user_avatar where user_id = ?',[req.user.userId])
        const [ hasDesc ] = await db.query('select * from user_des where user_id = ?',[req.user.userId])
        

        if(req.user.userRole.toLowerCase() == 'recruiter'){

            
            if(hasAvatar.length >= 1 && hasDesc.length >= 1 && hasTags.length >= 1){
                
                return res.status(200).json(true)
            
            }
            
            console.log([hasAvatar,hasDesc,hasRole,hasTechnologies])
            return res.status(200).json(false)

        }

         if(req.user.userRole.toLowerCase() == 'employee'){

           if(hasAvatar.length >= 1 && hasDesc.length >= 1 && hasRole.length  >= 1 && hasTechnologies.length >= 1){
                    
                return res.status(200).json(true)
            }

            return res.status(200).json(false)

        }

           

        }catch(err){

            return res.status(500).json(`database error : ${err}`)
        
        }

})



module.exports = isProfileFinishedRouter