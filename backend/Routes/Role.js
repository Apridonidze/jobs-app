const express = require('express')
const RoleRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

RoleRouter.get('/' , (req, res) => {
    res.send('role router default path')
})


RoleRouter.post('/' , verifyToken  , rateLimiter , async(req,res) => {
    
})


module.exports = RoleRouter