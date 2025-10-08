const jwt = require('jsonwebtoken')

const express = require('express')
const NewPostRouter = express.Router()
require('dotenv').config()


NewPostRouter.get('/', (req, res) => {
    res.send('/new-posts path')
})


NewPostRouter.post('/', (req,res) => {
    
})

//add posts method here



module.exports = NewPostRouter