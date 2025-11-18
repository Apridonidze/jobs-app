const express = require('express'); //importing express
const RoleRouter = express.Router(); //creating route

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');
const rateLimiter = require('../config/rateLimiter'); //importing middlewares

const RoleSchema = require('../schemas/RoleSchema'); //importing scheam for role inputs

RoleRouter.get('/my-roles' , verifyToken ,  async(req, res) => {

    try{

        const [ rows ] = await db.query('select * from user_roles where user_id = ?' , [req.user.userId]); //gets data from database 

        if(rows.length < 1) return res.status(204); //checks if ddata exists in database , if not so returns 204 status code
        
        return res.status(200).json(rows[0]);//else if data exists ,server sends 200 staus code to frotnend with data

    }catch(err){
        return res.status(500).json('Database Error'); //sends 500 staus code to frotnend if internal error occurs
    };
}); //api is used to get my account's roles based on user.id


RoleRouter.post('/upload-roles' , verifyToken  , rateLimiter , async(req,res) => {

    const RoleResp = RoleSchema(req.body); //passes down request input to schema

    if(!RoleResp.success) return res.status(400).json('invalid input'); //if schema does not validates , server sends 400 statsu code to frotnend
    
    //else try/catch block executes
    try{

        const [ rows ] = await db.query('select * from user_roles where user_id = ?' , [req.user.userId]);//gets data from database

        if(rows.length < 1){ //checks if user already has roles in database and if so....

            await db.query('insert into  user_roles (user_id,user_roles) values (?,?)', [req.user.userId, JSON.stringify(req.body.roles)]) ; //inserts data to backend
            
            return res.status(200).json('Technologies Uploaded Successfully'); //sends 200 status code to frotnend
            
        };

        //else if user already has roles

        await db.query('update user_roles set user_roles = ? where user_id = ?' , [JSON.stringify(req.body.roles),req.user.userId]); //updates prev roles in database
    
        return res.status(200).json('Technologies Updated Successfully'); //returns 200 status code to frotnend
    
    }
    catch(err){
        return res.status(500).json({err : 'Database Error'}); //returns 500 status code to frotend if interal error occurs
    };
});//api is used to upload roles for my account

module.exports = RoleRouter;//exporting route