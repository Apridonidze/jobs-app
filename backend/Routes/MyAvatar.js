const express =  require('express')
const MyAvatarRouter = express.Router()

const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

MyAvatarRouter.get('/', verifyToken, async (req,res) => {
    res.send('ym avatar route')
})



module.exports = MyAvatarRouter