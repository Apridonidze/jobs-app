const express = require('express')

const fs = require('fs')
const multer = require('multer')
const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

const UploadAvatarRouter = express.Router()
const upload = multer({dest:'avatar-upload/'})

UploadAvatarRouter.get('/' , (req,res) => {
    res.send('upload avatar path')

})

UploadAvatarRouter.post('/:userId' ,verifyToken , upload.single('avatar') , async(req,res) => {

    const [ rows ] = await db.query('select * from user_avatars where user_id = ?', [req.user.userId])

    const imgData = fs.readFileSync(filePath);

    const userId = req.user.userId;
    const filePath = req.file.path;

        const [ avatarRows ] = await db.query('insert into user_avatar (user_id , user_avatar_content) values (?,?)' , [userId, filePath])
   
    return res.status(200).json({message : 'sended' , data : avatarRows})
    //if there is rows then send update with user_id and user picture
    //if there is not rows then send insert into table with user_id and user picture

})


module.exports = UploadAvatarRouter