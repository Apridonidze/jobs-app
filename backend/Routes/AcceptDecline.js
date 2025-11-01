const express = require('express')
const verifyToken = require('../config/verifyToken')
const AcceptDeclineRouter = express.Router()
const AcceptDeclineSchema = require('../schemas/AcceptDeclineSchema')

const rateLimiter = require('../config/rateLimiter')

AcceptDeclineRouter.get('/', (req, res) => {
    res.send('accept or decline default path')
})


AcceptDeclineRouter.post('/accept-decline-employee', rateLimiter , verifyToken , async(req,res) => {

    const AcceptDeclineResep = AcceptDeclineSchema(req.body)

        if(!AcceptDeclineResep.success){
            return res.status(400).json('Invalid Input')
        }

    try{

        
        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter