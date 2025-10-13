const express = require('express')
const UploadAvatarRouter = express.Router()

UploadAvatarRouter.get('/' , (req,res) => {
    res.send('upload avatar path')
})


module.exports = UploadAvatarRouter