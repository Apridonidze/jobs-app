const express = require('express')

const fs = require('fs')
const multer = require('multer')
const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

const UploadAvatarRouter = express.Router()

const upload = multer({dest: '/uploads'})

UploadAvatarRouter.post('/' , verifyToken, upload.single('profile-picutre'), async (req,res) => {

    try{

        const file = req.file

        if(!file) return res.status(400).json({error: 'no image provided'})

        //add file type filter here with if statements 

        //check if user already has avatar pickture
        //if so then send update column
        //if not use insert new column

        fs.readFile(file.path , async(err, data) => {
            if(err) return res.status(500).send('error reading image')

            const [ rows ] = await db.query('insert into user_avatar (user_id, user_avatar_content) values (?,?)' , [req.user.userId, data])

            return res.status(200).json({message : 'avatar inserted successfully'})
    
        })

    }catch(err){
        
        return res.status(500).json({error:'Database Error'})

    }

})



module.exports = UploadAvatarRouter