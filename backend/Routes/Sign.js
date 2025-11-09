const expres = require('express')
const SignRouter = expres()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()

const validateUser = require('../schemas/UserSchema')
const db = require('../db/db')
const rateLimiter = require('../config/rateLimiter')


SignRouter.post('/create-account', rateLimiter ,async (req, res) => {
 const validationResp = validateUser(req.body);

    if (!validationResp.success) {
        return res.status(400).json('invalid input');
    }

    
    try {
        
        const { role, name, surname, password, email, phoneNumber, birthDate, gender } = req.body;
        
        
        const [rows] = await db.query('select * from users where user_email = ?' , [email])
        const [phoneRows] = await db.query('select * from users where user_phoneNumber = ?' , [phoneNumber])
        const hasshedPassword = await bcrypt.hash(password, 10); 

        if(rows.length > 0){
            return res.status(400).json('Account With This Email Already Exists')
        }

        if(phoneRows.length > 0){
            return res.status(400).json('Account With This Phone Number Already Exists')
        }

        const [userInsertion] = await db.query(
            `INSERT INTO users 
            (user_role, user_name, user_surname, user_password, user_email, user_phoneNumber, user_birthDate, user_gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [role, name, surname, hasshedPassword, email, phoneNumber, birthDate, gender]
        );

        const payload = {userId: userInsertion.insertId , userRole : role};

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })

        return res.status(200).json({
            message: 'User created successfully',
            token : token,
        }); 

    } catch (err) {
        return res.status(500).json('Database error');
    }

});




module.exports = SignRouter