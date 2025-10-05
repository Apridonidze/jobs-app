const express = require('express')
const MyUserRouter = express.Router()

MyUserRouter.get('/',(req,res) => {
    res.send('/')
})

module.exports = MyUserRouter