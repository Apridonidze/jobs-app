const express = require('express')
const AcceptDeclineRouter = express.Router()


AcceptDeclineRouter.get('/', (req, res) => {
    res.send('accept or decline default path')
})


AcceptDeclineRouter.post('/accept-decline-employee', (req,res) => {
    
})



module.exports = AcceptDeclineRouter