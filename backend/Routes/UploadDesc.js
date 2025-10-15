const express = require('express')
const verifyToken = require('../config/verifyToken')
const UploadDescRouter = express.Router()


UploadDescRouter.get('/', (req,res) => {
    res.send('upload desc path')
})

UploadDescRouter.post('/', verifyToken, async(req,res) => {

    

})


module.exports = UploadDescRouter