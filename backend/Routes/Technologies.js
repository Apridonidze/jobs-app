const express = require('express'); //importing express
const TechRouter = express.Router(); //creating route

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');
const rateLimiter = require('../config/rateLimiter');//importing middlewares

const TechnologiesSchema = require('../schemas/TechnologiesSchema'); //impporting schemas

TechRouter.get('/user-technologies', verifyToken ,async (req,res) => {

    
    try{

        const [ rows ] = await db.query('select * from user_technologies where user_id = ?', [req.user.userId]);//gets data from database
        
        if(rows.length < 1) return res.status(204);//checks if user does not have technologies into database and returns 204 status code
        
        return res.status(200).json(rows[0].user_technologies);//else returns 200 statsu code and technologies list to frotnend 

    }catch(err){

        return res.status(500).json('Database Error'); //returns 500 status code if internal error occurs

    };
});//api is used to get my users technologeis based on myuser.id


TechRouter.post('/new-technologies', verifyToken, rateLimiter, async (req,res) => {
    
    const TechResp = TechnologiesSchema(req.body)

    if(!TechResp.success)return res.status(400).json('invalid input')
    
    try{

        const [ rows ] = await db.query('select * from user_technologies where user_id = ?' , [req.user.userId]); //gets data from database

        if(rows.length < 1){//statement checks if user already has technologies , if no then...

            await db.query('insert into user_technologies (user_id,user_technologies) values (?,?)', [req.user.userId, JSON.stringify(req.body.technologies)]);//server sends insertion statement to database
            
            return res.status(200).json('Technologies Uploaded Successfully');//returns 200 stauts code to frotnend
            
        };

        //else if user already has technologies , then...

        await db.query('update user_technologies set user_technologies = ? where user_id = ?' , [JSON.stringify(req.body.technologies),req.user.userId]);//server sends update statement to database
    
        return res.status(200).json('Technologies Updated Successfully');//returns 200  status code to frotnend
    
    }catch(err){
        return res.status(500).json({err : 'Database Error'});//returns 500 status code to frotnend if internal error occurs
    };
});//api is used for employee to update / upload their technologies list to their page

module.exports = TechRouter;//exporting component