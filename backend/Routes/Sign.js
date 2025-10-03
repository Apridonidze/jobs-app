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

SignRouter.post('/', (req, res) => {
   
    
    const validationResp = validateUser(req.body)

    if(validationResp.success) {
        console.log('success validation')


        db.getConnection((err, conn) => {

            if(err)console.log('failed to connnect db')
            else console.log('successfull conection')

        })

    }else {
        console.log('failed')
    }

    //tokenize data if success

})



module.exports = SignRouter