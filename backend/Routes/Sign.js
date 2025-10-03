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
    name : z.string().min(3),
    surname : z.string().min(3),
    password : z.string().min(3),
    email : z.email(),
    phoneNumber : z.string().min(8),
    birthDate : z.string().length(10 , {message : 'invalid birth input'}),
    gender : z.enum(['male','female'])
})


SignRouter.get('/' , (req,res) => {
    res.send('sign path')
})

SignRouter.post('/', validateUser ,(req, res) => {


   console.log('/')

})

function validateUser (req , res , next) {
    
    const {data} = req.body

    const userData = {
        name: data.name,
        surname: data.surname,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthDate: data.birthDate,
        gender: data.gender,
    }

    console.log(data)
    console.log(userSchema.safeParse(userData))
    next()
}


module.exports = SignRouter