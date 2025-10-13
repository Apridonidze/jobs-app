const express = require('express')

const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

const UploadAvatarRouter = express.Router()

UploadAvatarRouter.get('/' , (req,res) => {
    res.send('upload avatar path')

})

UploadAvatarRouter.post('/' ,verifyToken , async(req,res) => {
    const [ rows ] = await db.query('select * from user_avatars where user_id = ?', [req.user.userId])

    //if there is rows then send update 
    //if there is not rows then send insert into 

})


module.exports = UploadAvatarRouter