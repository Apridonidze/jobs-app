const express = require('express')
const SavedRouter = express.Router()

const db = require('../db/db')
const verifyToken = require('../config/verifyToken')

SavedRouter.get('/my-saved-jobs', verifyToken, async(req,res) => {

    try{

        
        const [ Saved ] = await db.query('select * from saved_jobs where user_id = ?' , [req.user.userId])
        const [ user ] = await db.query('select * from users where user_id = ?', [req.user.userId])

        if(Saved.length < 1){
            return res.status(200).json({jobs : 'No Jobs Found' , user : user[0] , status : false})
        }

        for(let i = 0;  i <= Saved.length ; i++){
            const [job_data] = await db.query('select * from jobs where job_id = ?', [Saved[i].job_id])
        
            return res.status(200).json({jobs : job_data[0], user : user[0] , status : true})
    
        }
        
    }catch(err){
        return res.status(500).json('Database Error')
    }
})

SavedRouter.post('/post-my-saved-jobs',verifyToken , async (req,res) => {

    try{
        const [ JobsRow ] = await db.query('select * from jobs where job_id = ?', [req.body.job_id])

    if(JobsRow.length > 0){

        const [ isSaved ] = await db.query('select * from saved_jobs where job_id = ?' , [req.body.job_id ])
        const [ user ] = await db.query('select * from users where user_id = ?', [req.user.userId])

        if(isSaved.length < 1){
            await db.query('insert into saved_jobs (job_id, user_id) values (?, ?)' , [req.body.job_id , req.user.userId])
            return res.status(200).json({message : 'Job Saved Successfully' , status : true , user: user})
        }

        return res.status(200).json({message : 'You Have Already Saved This Job' , status : false, user: user})


    }

    }catch(err){
        return res.status(500).json('Database Error')
    }

})

//add delete statement


module.exports = SavedRouter