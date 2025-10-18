const express = require('express')
const verifyToken = require('../config/verifyToken')
const TagsRouter = express.Router()

TagsRouter.get('/my-tags',verifyToken, (req,res) => {
    res.send('tags router get path')
})


TagsRouter.post('/upload-tags' ,verifyToken, (req,res) => {
    console.log(req.body)
})



module.exports = TagsRouter