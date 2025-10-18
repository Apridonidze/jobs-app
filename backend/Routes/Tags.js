const express = require('express')
const verifyToken = require('../config/verifyToken')
const TagsRouter = express.Router()

TagsRouter.get('/my-tags',verifyToken, (req,res) => {
    res.send('tags router get path')
})


TagsRouter.post('/upload-tags' ,verifyToken, (req,res) => {
    console.log(req.body)

    //check req.body in schema
    //if !success return res status 400
    
    //else try inserting into table (check if user already has tags if so update table else if user doesnot have tags insert into table)
    //if successfully return res status 200
    //else send res status 500 (database error)
})



module.exports = TagsRouter