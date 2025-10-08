const expres = require('express')
const SignRouter = expres()

const cors = require('cors') 
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()

const validateUser = require('../schemas/UserSchema')
const db = require('../db/db')

const corsOption = {
    origin: 'http://localhost:5173', 
    methods : ["GET", 'POST'] ,
    credentials : true
}


SignRouter.use(cors(corsOption))
SignRouter.use(bodyParser.json())


SignRouter.get('/' , (req,res) => {
    res.send('sign path')
})

SignRouter.post('/', async (req, res) => {

    const validationResp = validateUser(req.body);

    if (!validationResp.success) {
        return res.status(400).json({ errors: validationResp.error.errors });
    }


    
    
    try {
        //console.log("Incoming body:", req.body);
        
        const { role, name, surname, password, email, phoneNumber, birthDate, gender } = req.body.data;
        
       
        const [rows] = await db.query('select * from users where user_email = ?' , [email])

        if(rows.length > 0){
            return res.status(400).json({ error: 'Account Already Exists With This Email' });
        }
        const [phoneRows] = await db.query('select * from users where user_phoneNumber = ?' , [phoneNumber])

        if(phoneRows.length > 0){
            return res.status(400).json({ error: 'Account Already Exists With This Phone Number' });
        }


        

        const hasshedPassword = await bcrypt.hash(password, 10); 


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
        return res.status(500).json({ error: 'Database error' });
    }
});




module.exports = SignRouter