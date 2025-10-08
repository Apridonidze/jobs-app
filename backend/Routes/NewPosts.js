const jwt = require('jsonwebtoken')

const express = require('express')
const NewPostRouter = express.Router()
require('dotenv').config()

const PostSchema = require('../schemas/PostSchema')
const verifyToken = require('../config/verifyToken')

NewPostRouter.get('/', (req, res) => {
    res.send('/new-posts path')
})


NewPostRouter.post('/', verifyToken, async (req,res) => {

    const validatePost = PostSchema(req.body)

    if(!validatePost.success){
        return res.status(400).json({error : 'invalid input'})
    }


    //push to database if true


})



module.exports = NewPostRouter