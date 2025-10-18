const express = require('express')
const TagsRouter = express.Router()

TagsRouter.get('/', (req,res) => {
    res.send('tags router get path')
})


TagsRouter.post('/' , (req,res) => {
   res.send('tags router post path')
})



module.exports = TagsRouter