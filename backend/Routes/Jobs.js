const express = require('express')
const JobsRouter =  express.Router()

JobsRouter.get('/',(req,res) => {
    res.send('jobs path')
})


module.exports = JobsRouter