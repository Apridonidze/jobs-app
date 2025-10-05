const express = require('express')
const LoginRouter = express.Router()

LoginRouter.get('/', (req,res) => {
    res.send('login route')
})


module.exports = LoginRouter