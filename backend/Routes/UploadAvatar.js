const express = require('express')

const fs = require('fs')
const multer = require('multer')
const cors = require('cors')
const verifyToken = require('../config/verifyToken')
const db = require('../db/db')

const UploadAvatarRouter = express.Router()


const corsOption = {
    origin: 'http://localhost:5173', 
    methods : ["GET", 'POST'] ,
    credentials : true
}
UploadAvatarRouter.use(cors(corsOption))

const upload = multer({dest: '/uploads'})

UploadAvatarRouter.post('/' , verifyToken, upload.single('profile-picutre'), async (req,res) => {

    try{

        const file = req.file

        if(!file) return res.status(400).json({error: 'no image provided'})


        fs.readFile(file.path , async(err, data) => {
            if(err) return res.status(500).send('error reading image')


            const [ rows ] = await db.query('select * from user_avatar where user_id = (?)', [req.user.userId])

            if(rows.length < 1){

                const [ insertRows ] = await db.query('insert into user_avatar (user_id, user_avatar_content) values (?,?)' , [req.user.userId, data])
                return res.status(200).json({message : 'avatar inserted successfully'})
            }

            const [ updateRows ] = await db.query('update user_avatar set user_avatar_content = ? where user_id = ?',[data, req.user.userId])


            return res.status(200).json('row updates successfully')


    
        })

    }catch(err){
        
        return res.status(500).json({error:'Database Error'})

    }

})



module.exports = UploadAvatarRouter