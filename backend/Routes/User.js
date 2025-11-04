const db = require('../db/db')

const express = require('express')
const UserRouter = express.Router()

require('dotenv').config()

const verifyToken = require('../config/verifyToken')

UserRouter.get('/my-user', verifyToken , async (req,res) => {

    if(req.user.userId){

        const [ userData ] = await db.query('select * from users where user_id = ?' , req.user.userId)

        return res.status(200).json({data : userData})
    }
    return res.status(401).json({error : 'no user found with this token '})

})

UserRouter.get('/user/:userId' , verifyToken , async (req,res) => {

    console.log(req.user.userId)

    try{

        const [ user ] = await db.query('select * from users where user_id = ?' , [req.params.userId])

        if(user.length > 0){
           
            const [ user_avatar ] = await db.query('select * from user_avatar where user_id = ?', [req.params.userId])
            const [ user_desc ] = await db.query('select * from user_des where user_id = ?', [req.params.userId])
            const [ user_roles ] =  await db.query('select * from user_roles where user_id = ?', [req.params.userId])
            const [ user_tags ] =  await db.query('select * from user_tags where user_id = ?', [req.params.userId])
            const [ user_technologies ] =  await db.query('select * from user_technologies where user_id = ?', [req.params.userId])

            
            if(user[0].user_role === 'Employee'){
                
                let data = {user : user[0]}

                if(user_avatar.length > 0){ const base64 = user_avatar[0].user_avatar_content .toString('base64') ; data = {...data , user_avatar : base64}} else {data = {...data, user_avatar : null}}
                if(user_desc.length > 0){ data = {...data , user_desc : user_desc[0].user_desc}} else {data = {...data, user_desc  : null}}
                if(user_roles.length > 0){ data = {...data, user_roles : user_roles[0].user_roles}} else {data = {...data, user_roles : null}}
                if(user_technologies.length > 0){ data = {...data, user_technologies : user_technologies[0].user_technologies}} else {data = {...data, user_technologies : null}}


                return res.status(200).json({message : "User Found" , status : true , data : data})

            }

            

            if(user[0].user_role === 'Recruiter'){

                let data = {user : user[0]}

                if(user_avatar.length > 0){ const base64 = user_avatar[0].user_avatar_content .toString('base64') ; data = {...data , user_avatar : base64}} else {data = {...data, user_avatar : null}}
                if(user_desc.length > 0){ data = {...data , user_desc : user_desc[0].user_desc}} else {data = {...data, user_desc  : null}}
                if(user_tags.length > 0){ data = {...data, user_tags: user_tags[0].user_tags}} else {data = {...data, user_tags: null}}
                

                
                return res.status(200).json({message : "User Found" , status : true , data : data})
            }

            
        }
        
        
        return res.status(200).json({message : "User Not Found" , status : false , data : null })

    }catch(err){
        return res.status(500).json('Internal Error')
    }

})


module.exports = UserRouter