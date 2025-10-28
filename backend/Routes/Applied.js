const express = require('express')
const AppliedRouter = express.Router()

AppliedRouter.get('/my-applied-jobs', (req,res) => {
    console.log(req.body)
    //integrate beriftytoken
    //check if user aplied for jos baed on their token
    //return no jobs found if there is not rovs
    //else return jobs user has applied and status form recuiter /not checked yet // seen user // acceped user //denied user
})
AppliedRouter.post('/post-my-applied-jobs', (req,res) => {
    return res.status(200).json('asdasd')
 //check user token
 //check user input
 //pushinto table
})


module.exports = AppliedRouter