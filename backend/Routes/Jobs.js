const express = require('express')
const verifyToken = require('../config/verifyToken')
const JobsRouter = express.Router()

JobsRouter.get('/' ,verifyToken, (req,res) => {
    res.send('jobs path')
})



module.exports = JobsRouter