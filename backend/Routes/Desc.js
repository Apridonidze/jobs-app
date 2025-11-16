const express = require('express')
const DescRouter = express.Router()

const db = require('../db/db')
const validateDesc = require('../schemas/DescSchema')
const verifyToken = require('../config/verifyToken')
const rateLimiter = require('../config/rateLimiter')

DescRouter.get('/my-desc', verifyToken , async (req,res) => {
    

    const [ rows ] = await db.query('select * from user_des where user_id = ?' , [req.user.userId])


    try{

        if(rows.length < 1){
        
            return res.status(204).json('No Description Yet')
        
        }
    
        return res.status(200).json(rows[0].user_desc)


    }catch(err){
        return res.status(400).json('Database Error')
    }


})

DescRouter.post('/add-desc', rateLimiter,verifyToken, async(req,res) => {

    const descResp = validateDesc(req.body.data)

    if(!descResp.success){
        return res.status(400).json({err : 'Invalid Input'})
    }




   
    try{
        
        const [ rows ] = await db.query('select * from user_des where user_id = ?', [req.user.userId])

        

       if(rows.length > 0) {
           await db.query('update user_des set user_desc = ? where user_id = ?', [req.body.data.desc , req.user.userId])
           return res.status(200).json({message : 'Description Updated Successfully'})
    }
    
    await db.query('insert into user_des (user_id , user_desc) values (?,?)' , [req.user.userId , req.body.desc])
    return res.status(200).json({message : 'Description Added Successfully'})

    }catch(err){

        return res.status(500).json({err : "Internal Error"})

    }


})


module.exports = DescRouter