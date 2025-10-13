const express = require('express')
const SendResumeRouter = express.Router()


SendResumeRouter.get('/', (req,res) => {
    res.send('send resume.js')
})


module.exports = SendResumeRouter