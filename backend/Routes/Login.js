const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const LoginRouter = express.Router()
require('dotenv').config()

const db = require('../db/db')

const LoginSchema = require('../schemas/LoginSchema')



LoginRouter.get('/', (req,res) => {
    res.send('login route')
})



LoginRouter.post('/', async (req,res) => {
    
    const loginResp = LoginSchema(req.body)

    const {email, password} = req.body

    if(!loginResp.success){

        return res.status(400).json( { erorr : loginResp.error.errors})

    }

    try{


        const [rows] = await db.query('select * from users where user_email = ?' ,[email])

        if(rows.length === 0){
            return res.status(404).json({error : 'User Not Found'})
        }

        const user = rows[0]

        const isPasswordValid = await bcrypt.compare(password, user.user_password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Password' });
        }
        
        const payload = {userId : user.user_id, userRole : user.user_role}
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })
        
        return res.status(200).json({message : 'User Found', token : token})
        

    }catch(err){
        return res.status(500).json({ error: 'Database error' });
    }

})

module.exports = LoginRouter