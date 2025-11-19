const express = require('express'); //importing express
const UserRouter = express.Router(); //creating route

const verifyToken = require('../config/verifyToken');
const db = require('../db/db');//importing middlewares

require('dotenv').config();//importing dotenv


UserRouter.get('/my-user', verifyToken , async (req,res) => {

    try{
        
        if(req.user.userId){//statemnet checks if we get user.id from token verification andd then executes this logic

            const [ userData ] = await db.query('select * from users where user_id = ?' , req.user.userId) ;//gets data fro mdatabase based on user id 
            return res.status(200).json(userData[0]);//returns 200 status code to frotnend
        };

        return res.status(401).json({error : 'no user found with this token '});//returns 401 status code to frotnend if user id is not found in token

    }catch(err){
        return res.status(500).json('Internal Error');//returns 500 status code if internal error occurs
    };

});//api is used to get data about my user when visitng my user page


UserRouter.get('/user/:userId' , verifyToken , async (req,res) => {

    try{

        const [ user ] = await db.query('select * from users where user_id = ?' , [req.params.userId]);//gettign data from database about user based on userid provided from veriftToken middleware

        if(req.user.userId === req.params.userId) return res.status(200).json({message : "" , status : false , data : null , myuser : true});//if visitor user id === myuser id , server returns 200 status code with empty message (because frotnend auitomatically redirect me to my page if same situation happens)
        

        if(user.length > 0){
           
            const [ user_avatar ] = await db.query('select * from user_avatar where user_id = ?', [req.params.userId]);
            const [ user_desc ] = await db.query('select * from user_des where user_id = ?', [req.params.userId]);
            const [ user_roles ] =  await db.query('select * from user_roles where user_id = ?', [req.params.userId]);
            const [ user_tags ] =  await db.query('select * from user_tags where user_id = ?', [req.params.userId]);
            const [ user_technologies ] =  await db.query('select * from user_technologies where user_id = ?', [req.params.userId]);//getting all needed data to display users page 

            if(user[0].user_role === 'Employee'){//checks user role and sends user data based on it
                
                let data = {user : user[0]};

                if(user_avatar.length > 0){ const base64 = user_avatar[0].user_avatar_content .toString('base64') ; data = {...data , user_avatar : base64}} else {data = {...data, user_avatar : null}};
                if(user_desc.length > 0){ data = {...data , user_desc : user_desc[0].user_desc}} else {data = {...data, user_desc  : null}};
                if(user_roles.length > 0){ data = {...data, user_roles : user_roles[0].user_roles}} else {data = {...data, user_roles : null}};
                if(user_technologies.length > 0){ data = {...data, user_technologies : user_technologies[0].user_technologies}} else {data = {...data, user_technologies : null}};

                //filters datas , sets data into object if found else it returns null to pass down as user does not have their profile finished

                return res.status(200).json({message : "User Found" , status : true , data : data , myuser: false}); //returns 200 status code to frotnend witth data

            };

            if(user[0].user_role === 'Recruiter'){//checks user role and sends user data based on it

                let data = {user : user[0]};

                if(user_avatar.length > 0){ const base64 = user_avatar[0].user_avatar_content .toString('base64') ; data = {...data , user_avatar : base64}} else {data = {...data, user_avatar : null}};
                if(user_desc.length > 0){ data = {...data , user_desc : user_desc[0].user_desc}} else {data = {...data, user_desc  : null}};
                if(user_tags.length > 0){ data = {...data, user_tags: user_tags[0].user_tags}} else {data = {...data, user_tags: null}};
                
                 //filters datas , sets data into object if found else it returns null to pass down as user does not have their profile finished


                return res.status(200).json({message : "User Found" , status : true , data : data , myuser : false});//returns 200 status code to frotnend witth data
            };            
        };
        
        return res.status(200).json({message : "User Not Found" , status : false , data : null , myuser : false}); //else if userid is not provided it returns 200 status code to frotnend iwth user not found message

    }catch(err){
        return res.status(500).json('Internal Error');//returns 500 status code to frotnend if internal error occurs
    };
});


module.exports = UserRouter;//exporting route