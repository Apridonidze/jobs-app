const express = require('express')
const UploadDescRouter = express.Router()


UploadDescRouter.get('/', (req,res) => {
    res.send('upload desc path')
})


module.exports = UploadDescRouter