const express = require('express')
const JobsRouter =  express.Router()

const db = require('../db/db')

JobsRouter.get('/', async (req,res) => {

    const [ rows ] = await db.query('select * from jobs')

    if(rows.length > 0) {
        return res.status(200).json({message: 'Jobs Found', jobs : rows})
    }

    return res.status(400).json({error : 'No Jobs Found Yet'})

})


module.exports = JobsRouter