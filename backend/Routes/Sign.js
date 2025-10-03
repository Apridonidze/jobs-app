const expres = require('express')
const SignRouter = expres()

const cors = require('cors') 
const bodyParser = require('body-parser')
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
        console.log("Incoming body:", req.body);

        const { role, name, surname, password, email, phoneNumber, birthDate, gender } = req.body.data;
        console.log("Parsed fields:", role, name, surname, password, email, phoneNumber, birthDate, gender);

        const [result] = await db.query(
            `INSERT INTO users 
            (user_role, user_name, user_surname, user_password, user_email, user_phoneNumber, user_birthDate, user_gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [role, name, surname, password, email, phoneNumber, birthDate, gender]
        );

        return res.status(200).json({
            message: 'User created successfully',
            userId: result.insertId
        });

    } catch (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: 'Database error' });
    }
});




module.exports = SignRouter