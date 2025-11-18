const express = require('express'); //importing express
const AvatarRouter = express.Router(); //creating router

const fs = require('fs') ; 
const multer = require('multer'); //importing node libraries

const upload = multer({dest: '/uploads'}); //usings multer for images uploading to database

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');//importing middlewares

AvatarRouter.get('/', verifyToken, async (req,res) => {

    try{
        const [ rows ] = await db.query('select * from user_avatar where user_id = (?)' ,[req.user.userId]); //fetches data from database based on userId

        if(rows.length < 1){
            
            return res.status(204).json('no user avatar found');
        
        }; //checks length of rows and returns status 204 if no user avatar was found

        //else if user avatar is found 

        const imgBuffer = rows[0].user_avatar_content;  //sets user_avatar content in variable
        const base64 = imgBuffer.toString('base64'); //converts user_avatar content in base64
        
        return res.status(200).json(`data:image/jpeg;base64,${base64}`); //returns 200 status code response to frotnend 

    }catch(err){
    
        return res.status(500).json({error : 'Database Error'}) ; //returns 500 status code if internal error occurs
    
    };
});//api is used for getting my user profile



AvatarRouter.post('/' , verifyToken, upload.single('profile-picutre'), async (req,res) => {

    try{

        const file = req.file; //gets file from request

        if(!file) return res.status(400).json({error: 'no image provided'}) //if route does not get file then it returns 400 status code

        //else it executes next logic

        fs.readFile(file.path , async(err, data) => { //reads image

            if(err) return res.status(500).send('error reading image') ; //detects error and returns this response to frontned

            //else this logic ecexutes

            const [ rows ] = await db.query('select * from user_avatar where user_id = (?)', [req.user.userId]) ; //checks if user already has avatar uploaded in database

            if(rows.length < 1){ //if user does not have avatar image uploaded yet this statement executes

                await db.query('insert into user_avatar (user_id, user_avatar_content) values (?,?)' , [req.user.userId, data]); //inserts new avatar image to database
                return res.status(200).json({message : 'avatar inserted successfully'}); //returns 200 status code respopnse to frotnend
            }; 

            //if user already has avatar

            await db.query('update user_avatar set user_avatar_content = ? where user_id = ?',[data, req.user.userId]); //updates oldd avatar picture with new one in database
            return res.status(200).json('row updates successfully'); //sends 200 status code to frotnend


    
        }); //reads profile image and returns error and data , if error occurs 500 status code is sended to frotend ,else 200 status code

    }catch(err){
        
        return res.status(500).json({error:'Database Error'}); //sends 500 staus code if internal error occurs

    };

});

module.exports = AvatarRouter; //exporting route