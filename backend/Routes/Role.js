const express = require('express')
const RoleRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

RoleRouter.get('/my-roles' , (req, res) => {
    res.send('role router default path')
})


RoleRouter.post('/upload-roles' , verifyToken  , rateLimiter , async(req,res) => {
    console.log(req.body)
})


module.exports = RoleRouter