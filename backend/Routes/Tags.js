const express = require('express')
const TagsRouter = express.Router()

const db = require('../db/db');
const verifyToken = require('../config/verifyToken')
const TagsSchema = require('../schemas/TagsSchema')


TagsRouter.get('/my-tags',verifyToken, (req,res) => {
    res.send('tags router get path')
})


TagsRouter.post('/upload-tags' ,verifyToken, async (req,res) => {

    const tagsResp = TagsSchema(req.body)

    if(!tagsResp.success){
    
        return res.status(400).json({err : 'Invalid Input'})
    
    }

    try{
         const [rows] = await db.query('select * from user_tags where user_id = ?',[req.user.userId])

        if(rows.length < 1){
    
            await db.query('insert into user_tags (user_id,user_tags) values (?,?)',[req.user.userId, JSON.stringify(req.body.tags)])
            return res.status(200).json('data recieved')
    
        }

        await db.query('update user_tags set user_tags = ? where user_id = ?',[JSON.stringify(req.body.tags), req.user.userId ])
        return res.status(200).json('tags updated succesffulyly')

    }catch(err){
    
        return res.status(500).json({err : 'Database Error'})
    
    }

})



module.exports = TagsRouter