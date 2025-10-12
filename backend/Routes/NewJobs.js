const express = require('express')
const NewJobsRouter = express.Router()

NewJobsRouter.get('/', (req,res) => {
    res.send('new jobs path')
})


NewJobsRouter.post('/', (req,res) => {
    console.log(req.body)
})


module.exports = NewJobsRouter;