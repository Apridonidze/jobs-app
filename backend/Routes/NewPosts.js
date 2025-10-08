//import jwt here and dotenv

const express = require('express')
const NewPostRouter = express.Router()


NewPostRouter.get('/', (req, res) => {
    res.send('/new-posts path')
})

//add posts method here



module.exports = NewPostRouter