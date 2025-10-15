const express = require('express')
const UploadDescRouter = express.Router()

const db = require('../db/db')
const validateDesc = require('../schemas/DescSchema')
const verifyToken = require('../config/verifyToken')

UploadDescRouter.get('/', (req,res) => {
    res.send('upload desc path')
})

UploadDescRouter.post('/', verifyToken, async(req,res) => {

    const descResp = validateDesc(req.body)

    if(!descResp.success){
        return res.status(400).json({err : 'Invalid Input'})
    }


})


module.exports = UploadDescRouter