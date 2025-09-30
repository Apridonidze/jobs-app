const expres = require('express')
const SignRouter = expres()

const cors = require('cors') //add cors options with only localhost:5173 option 
const bodyParser = require('body-parser')
require('dotenv').config()


SignRouter.use(cors())
SignRouter.use(bodyParser.json())


SignRouter.get('/' , (req,res) => {
    res.send('sign path')
})

module.exports = SignRouter