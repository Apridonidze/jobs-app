const jwt = require('jsonwebtoken')

const express = require('express')
const NewPostRouter = express.Router()
require('dotenv').config()

const PostSchema = require('../schemas/PostSchema')

NewPostRouter.get('/', (req, res) => {
    res.send('/new-posts path')
})


NewPostRouter.post('/', PostSchema, async (req,res) => {
    PostSchema(req.body)

    if(!PostSchema.success){
        //return err
    }

    //add else function
})

//add posts method here



module.exports = NewPostRouter