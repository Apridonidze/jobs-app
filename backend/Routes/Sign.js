const expres = require('express')
const SignRouter = expres()

const cors = require('cors') 
const bodyParser = require('body-parser')
require('dotenv').config()


const corsOption = {
    origin: 'http://localhost:5173' , 
    methods : ["GET", 'POST'] ,
    credentials : true
}


SignRouter.use(cors(corsOption))
SignRouter.use(bodyParser.json())


SignRouter.get('/' , (req,res) => {
    res.send('sign path')
})

module.exports = SignRouter