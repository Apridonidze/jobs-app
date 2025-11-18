const express = require('express'); //importing express
const isProfileFinishedRouter = express.Router(); //creating route

const db = require('../db/db');
const verifyToken = require('../config/verifyToken');//importing middlewares

isProfileFinishedRouter.get('/', verifyToken , async (req,res) => {
    
    try{
 
        const [ hasRole ] = await db.query('select * from user_roles where user_id = ?',[req.user.userId]);
        const [ hasTags ] = await db.query('select * from user_tags where user_id = ?',[req.user.userId]);
        const [ hasTechnologies ] = await db.query('select * from user_technologies where user_id = ?',[req.user.userId]);
        const [ hasAvatar ] = await db.query('select * from user_avatar where user_id = ?',[req.user.userId]);
        const [ hasDesc ] = await db.query('select * from user_des where user_id = ?',[req.user.userId]);

        //gets user : role , tag , technologies , avatar image  and description from database 
        
        if(req.user.userRole.toLowerCase() == 'recruiter'){//checks if user role is recruiter to require needed data for role

            if(hasAvatar.length >= 1 && hasDesc.length >= 1 && hasTags.length >= 1) return res.status(200).json(true) ; //checks if recruiter has avatar image , description and tags , then sends 200 status code to frotnend 

            return res.status(200).json(false); //else if recruiter does not have any of the parameters in database , server returns 200 status code to frotnend with false value (frotnend consumes variable and toggles alert message based on if varaible is true or false)

        };

        if(req.user.userRole.toLowerCase() == 'employee'){ //checks if user roel is employee

           if(hasAvatar.length >= 1 && hasDesc.length >= 1 && hasRole.length  >= 1 && hasTechnologies.length >= 1) return res.status(200).json(true) ; ///checks if employee has : avatar iamge, description , role andd technologeis filled , then sends 200 status code t ofrotnend

            return res.status(200).json(false); //else if user does not have any of the parameters in database , server returns false varaible to frotnend

        };


    }catch(err){

        return res.status(500).json(`Database Error`); //returns 500 statsu code if internal error occurs
        
    };
});

module.exports = isProfileFinishedRouter; //exporting route