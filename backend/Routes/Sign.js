const expres = require('express')
const SignRouter = expres()

const z = require('zod')
const cors = require('cors') 
const bodyParser = require('body-parser')
require('dotenv').config()


const corsOption = {
    origin: 'http://localhost:5173', 
    methods : ["GET", 'POST'] ,
    credentials : true
}


SignRouter.use(cors(corsOption))
SignRouter.use(bodyParser.json())


const userSchema = z.object({
    role : z.string(),
    name : z.string().min(3),
    surname : z.string().min(3),
    password : z.string().min(3),
    email : z.email(),
    phoneNumber : z.string().min(8),
    birthDate : z.date(),
    gender : z.enum('male','female')
})


SignRouter.get('/' , (req,res) => {
    res.send('sign path')
})

SignRouter.post('/', validateUser ,(req, res , next) => {


    if(data){


        return res.status(200).json({message : 'data recieved' , data})
    }

    res.status(400).json({message: 'no data recieved'})

})

function validateUser () {

}


module.exports = SignRouter