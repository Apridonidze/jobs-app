const express = require('express')
const TechRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

TechRouter.get('/user-technologies', (req,res) => {
    res.send('/technologies path')
})


TechRouter.post('/new-technologies', verifyToken, rateLimiter, (req,res) => {
    console.log(req.body)
})



module.exports = TechRouter