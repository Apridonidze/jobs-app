const express = require('express'); //importing express
const LoginRouter = express.Router(); //creating route

require('dotenv').config();//importing dotenv

const db = require('../db/db'); 
const rateLimiter = require('../config/rateLimiter');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); //importing node libraries

const LoginSchema = require('../schemas/LoginSchema');//importing schema for login inputs

LoginRouter.post('/', rateLimiter,async (req,res) => {
    
    const loginResp = LoginSchema(req.body); //passing down data to schema
    
    if(!loginResp.success) return res.status(400).json( { erorr : loginResp.error.errors}) //returns 400 status code if schema does not validate
        
    const {email, password} = req.body; //sets needed parametrs in varaiable for flexible use

    try{

        const [rows] = await db.query('select * from users where user_email = ?' ,[email]); //gets data from database

        if(rows.length === 0) return res.status(404).json({error : 'User Not Found'});  //if email does not exists in database returns 404 status code
        
        //else this logic executes

        const user = rows[0]; //sets user into variable for flexible use

        const isPasswordValid = await bcrypt.compare(password, user.user_password); //compares request's password to database password

        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid Password' }); //returns password invalidity if input and password are not same
        
        //else this logic executes
        
        const payload = {userId : user.user_id, userRole : user.user_role};//variable for token payload (non-sensitive data that will give each user unique token  + it will make for us to identify user who made request to server)
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });// creates token that expires in 30 days 
        
        return res.status(200).json({message : 'User Found', token : token}); //returns 200 status code with token and also message
        

    }catch(err){
        return res.status(500).json({ error: 'Database error' }); //returns 500 statsu code if internal error occurs
    };
});

module.exports = LoginRouter;//exporting route