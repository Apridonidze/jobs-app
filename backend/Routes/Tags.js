const express = require('express'); //importing express
const TagsRouter = express.Router(); //creating route

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');
const rateLimiter = require('../config/rateLimiter'); //importing middlewares

const TagsSchema = require('../schemas/TagsSchema');//importing schema for tags input

TagsRouter.get('/my-tags',verifyToken, async (req,res) => {

    const [ rows ] = await db.query('select * from user_tags where user_id = ?',[req.user.userId]); //gets data from database 

    if(rows.length < 1)return res.status(204);//checks if user has role in database ,then returns 204 status code to frotnend

    return res.status(200).json(rows[0].user_tags); //returns 200 status code if user tags are found in database.
    
}); //api is used to get my user tags

TagsRouter.post('/upload-tags' , verifyToken, rateLimiter, async (req,res) => {

    const tagsResp = TagsSchema(req.body); //passes down data from request to schema to validate input

    if(!tagsResp.success) return res.status(400).json({err : 'Invalid Input'}) //returns 400 staus code if schema does not validate
    
    //else try/catch block executes

    try{

        const [ rows ] = await db.query('select * from user_tags where user_id = ?',[req.user.userId]); //gets data from database

        if(rows.length < 1){//statement checks if user does not have tags ,then...
    
            await db.query('insert into user_tags (user_id,user_tags) values (?,?)',[req.user.userId, JSON.stringify(req.body.tags)]); //sends insertion statement to database
            return res.status(200).json('data recieved'); //sends 200 status code to frotnend
    
        };

        //else if user has tags already uploaded , then ...

        await db.query('update user_tags set user_tags = ? where user_id = ?',[JSON.stringify(req.body.tags), req.user.userId ]); //sends update statemnet to databse
        return res.status(200).json('tags updated successfully');//returns 200 status code to frotnend

    }catch(err){
    
        return res.status(500).json({err : 'Database Error'});//returns 500 status codde to frotned if internal errror occurs
    
    };
});

module.exports = TagsRouter;//exporting route