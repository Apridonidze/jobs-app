const express =  require('express')
const MyAvatarRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

MyAvatarRouter.get('/', verifyToken, async (req,res) => {


    try{


        const [ rows ] = await db.query('select * from user_avatar where user_id = (?)' ,[req.user.userId])

        if(rows.length < 1){
            return res.status(400).json('no user avatar found')
        }

        const imgBuffer = rows[1].user_avatar_content
        const base64 = imgBuffer.toString('base64')
        
        return res.status(200).json(`data:image/jpeg;base64,${base64}`)
        

    }catch(err){
        return res.status(500).json({error : 'Database Error'})
    }

})



module.exports = MyAvatarRouter