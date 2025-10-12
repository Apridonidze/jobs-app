const express = require('express')
const NewJobsRouter = express.Router()

NewJobsRouter.get('/', (req,res) => {
    res.send('new jobs path')
})



module.exports = NewJobsRouter;