const express = require('express')
const TechRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

const TechnologiesSchema = require('../schemas/TechnologiesSchema')

TechRouter.get('/user-technologies', (req,res) => {
    res.send('/technologies path')
})


TechRouter.post('/new-technologies', verifyToken, rateLimiter, (req,res) => {
    const TechResp = TechnologiesSchema(req.body)

    if(!TechResp.success){
        return res.status(400).json('invalid input')
    }
    
    return res.status(200).json('valid data')

})



module.exports = TechRouter