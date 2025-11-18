const expres = require('express');//importing express
const SignRouter = expres(); //creating route

const db = require('../db/db'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimiter = require('../config/rateLimiter'); //importing middlewares

const validateUser = require('../schemas/UserSchema');//importing shcema for user inputs validation

require('dotenv').config(); //importing dotenv


SignRouter.post('/create-account', rateLimiter ,async (req, res) => {

    const validationResp = validateUser(req.body.data); //passes down data to schema to validate input from requests

    if (!validationResp.success) return res.status(400).json('invalid input'); //if schema does not validate input , server returns 400 status code to frotnend
    
    //else try/catch block executes
    try {
        
        const { role, name, surname, password, email, phoneNumber, birthDate, gender } = req.body.data;//sets request data into states for easier usage

        const [ rows ] = await db.query('select * from users where user_email = ?' , [ email ]);//gets data from ddatabase about users email (to check if user with this email already exists)
        const [ phoneRows ] = await db.query('select * from users where user_phoneNumber = ?' , [ phoneNumber ]);//gets data from ddatabase about users phone number (to check if user with this phone number already exists)
        const hasshedPassword = await bcrypt.hash(password, 10); //hasts and salts password so every users password is stored in database securly with its unique salt

        if(rows.length > 0) return res.status(400).json('Account With This Email Already Exists'); //checks if email already exists in database ,then returns 400 status code to frotnend
        
        if(phoneRows.length > 0) return res.status(400).json('Account With This Phone Number Already Exists'); //checks if phone already exists in ddatabase ,tghen returns 400 status code to frotnend
        
        //else if there is not email and phone number used by other user

        const [userInsertion] = await db.query(
            `INSERT INTO users 
            (user_role, user_name, user_surname, user_password, user_email, user_phoneNumber, user_birthDate, user_gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [role, name, surname, hasshedPassword, email, phoneNumber, birthDate, gender]
        );//server sends insertion statement to database

        const payload = {userId: userInsertion.insertId , userRole : role}; //created payload token

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30d" }); //sets token

        return res.status(200).json({message: 'User created successfully',token : token,}); //returns 200 status code to frontned with message and token

    } catch (err) {
        return res.status(500).json('Database error');//returns 500 status code if internal error occurs
    };
});

module.exports = SignRouter;//exporting route