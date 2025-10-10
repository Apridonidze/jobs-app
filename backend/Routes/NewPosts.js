const express = require('express')
const db = require('../db/db')

const NewPostRouter = express.Router()

require('dotenv').config()

const PostSchema = require('../schemas/PostSchema')
const verifyToken = require('../config/verifyToken')

NewPostRouter.get('/', (req, res) => {
    res.send('/new-posts path')
})


NewPostRouter.post('/', verifyToken, async (req,res) => {

    const validatePost = PostSchema(req.body)

    if(!validatePost.success){
        return res.status(400).json({error : 'invalid input'})
    }

    try{

        const [ newpost ] = await db.query('Insert into posts (user_id, post_text) values (?,?)', [req.user.userId , req.body.postInput])

        return res.status(200).json({message : 'Post Created Succesfully'})
        
    }catch(err){
        return res.status(500).json({error : 'Database Error'})

    }







    //create table for users_posts and insert user_id and post_input (generate post_id in sql)
    //insert data to mysql
    //send status code to user 

    //create posts.js route for frontend to fetch data from that file and display on frontend

})



module.exports = NewPostRouter