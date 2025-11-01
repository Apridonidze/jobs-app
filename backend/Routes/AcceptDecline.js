const express = require('express')
const verifyToken = require('../config/verifyToken')
const AcceptDeclineRouter = express.Router()


AcceptDeclineRouter.get('/', (req, res) => {
    res.send('accept or decline default path')
})


AcceptDeclineRouter.post('/accept-decline-employee', verifyToken , async(req,res) => {


    try{

        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter