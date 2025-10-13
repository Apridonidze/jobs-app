const express = require('express')

const fs = require('fs')
const multer = require('multer')
const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

const UploadAvatarRouter = express.Router()

const upload = multer({dest: '/uploads'})

UploadAvatarRouter.post('/' , verifyToken, upload.single('profile-picutre'), async (req,res) => {
    res.send('upload avatar path')

    const file = req.file

    console.log(file)

})



module.exports = UploadAvatarRouter