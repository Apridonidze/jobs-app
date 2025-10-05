const express = require('express')
const LoginRouter = express.Router()

LoginRouter.get('/', (req,res) => {
    res.send('login route')
})



LoginRouter.post('/', (req,res) => {
    const {email, password} = req.body
    console.log(email)
})

module.exports = LoginRouter