const express = require('express')
const TechRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

TechRouter.get('/', (req,res) => {
    return res.status('/technologies path')
})


TechRouter.post('/', verifyToken, rateLimiter, (req,res) => {
    console.log(req.body)
})



module.exports = TechRouter