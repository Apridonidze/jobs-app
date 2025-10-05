const express = require('express')
const LoginRouter = express.Router()

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

        if(rows.length > 0){
            return res.status(200).json( { message: 'User Found' } )
        }
            return res.status(400).json( { erorr: 'User Not Found' } )
        


    }catch(err){
        return res.status(500).json({ error: 'Database error' });
    }

})

module.exports = LoginRouter