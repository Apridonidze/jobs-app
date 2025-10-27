const express = require('express')
const SavedRouter = express.Router()

SavedRouter.get('/', (req,res) => {
    //verify token 
    //fetch data based on req.user.userId
    //if there is not any data return 400 status code
})

SavedRouter.post('/', (req,res) => {
    //verify token 
    //verify input
    //add data to db
})

//add delete statement


module.exports = SavedRouter