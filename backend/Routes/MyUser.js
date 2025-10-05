const express = require('express')
const MyUserRouter = express.Router()

MyUserRouter.get('/', verifyToken,(req,res) => {

})


function verifyToken (req , res , next){
    
}

module.exports = MyUserRouter