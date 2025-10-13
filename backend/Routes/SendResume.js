const express = require('express')
const SendResumeRouter = express.Router()

const multer = require('multer')
const fs = require('fs')

const resumeUpload = multer({dest : '/'})

SendResumeRouter.get('/', resumeUpload.single('image'), (req,res) => {

    const resumeName = req.file.originalname
    const resumeData = fs.readFileSync(req.file.path)

    res.send('send resume.js')
})


module.exports = SendResumeRouter