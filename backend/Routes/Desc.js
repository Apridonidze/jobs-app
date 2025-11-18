const express = require('express'); //impporting express
const DescRouter = express.Router() ; //creating route 

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');
const rateLimiter = require('../config/rateLimiter'); //importing middlewares

const validateDesc = require('../schemas/DescSchema') ; //importing shecema for description input check



DescRouter.get('/my-desc', verifyToken , async (req,res) => {

    try{
        const [ rows ] = await db.query('select * from user_des where user_id = ?' , [req.user.userId]); //gets user data from database and sets in variable
        
        if(rows.length < 1)return res.status(204);//if user does not have description , server sends 204 status code to frontend
    
        return res.status(200).json(rows[0].user_desc);//else sends user description to frotnend

    }catch(err){
        return res.status(400).json('Database Error'); //sends 500 staus code if internal error occurs
    };
}); //api is used to get users description from database based on user id 


DescRouter.post('/add-desc', rateLimiter,verifyToken, async(req,res) => {

    const descResp = validateDesc(req.body.data) ; //sends data from request to schema

    if(!descResp.success) return res.status(400).json({err : 'Invalid Input'}) ; //if schema does not validate input then 400 status code is sended to frontend
   
    //if schema validates input try/catch block executes

    try{ 
        
        const [ rows ] = await db.query('select * from user_des where user_id = ?', [req.user.userId]); //gets data from database

       if(rows.length > 0) { //checks if data is not empty (if user already has description)

           await db.query('update user_des set user_desc = ? where user_id = ?', [req.body.data.desc , req.user.userId]);  //updates users description
           return res.status(200).json({message : 'Description Updated Successfully'}); //sends 200 status codde to frontned

        };
        
        //else if user does not have old description
        await db.query('insert into user_des (user_id , user_desc) values (?,?)' , [req.user.userId , req.body.desc]); //server inserts desc to database
        return res.status(200).json({message : 'Description Added Successfully'}); //sends 200 status code to frotnend

    }catch(err){

        return res.status(500).json({err : "Internal Error"}); //returns 500 status code if interal error occurs

    };
});

module.exports = DescRouter; //exporting route