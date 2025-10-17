const express = require('express')
const DescRouter = express.Router()

const db = require('../db/db')
const validateDesc = require('../schemas/DescSchema')
const verifyToken = require('../config/verifyToken')

DescRouter.get('/', (req,res) => {
    res.send('upload desc path')
})

DescRouter.post('/', verifyToken, async(req,res) => {

    const descResp = validateDesc(req.body)

    if(!descResp.success){
        return res.status(400).json({err : 'Invalid Input'})
    }


    const [ rows ] = await db.query('select * from user_des where user_id = ?', [req.user.userId])

    try{
        
        if(rows.length < 1){
            
            await db.query('insert into user_des (user_id, user_desc) values (?,?)' , [req.user.userId, req.body.desc])
            
            return res.status(200).json({message : 'Description Added Successfully'})

        }

        await db.query('update user_des set user_desc = ? where user_id = ?', [req.body.desc, req.user.userId])

        return res.status(200).json({message : 'Description Updated Successfully'})



    }catch(err){

        return res.status(500).json({err : 'Database Error'})

    }


})


module.exports = DescRouter