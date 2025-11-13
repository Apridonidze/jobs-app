const express = require('express')
const verifyToken = require('../config/verifyToken')
const AcceptDeclineRouter = express.Router()
const AcceptDeclineSchema = require('../schemas/AcceptDeclineSchema')

const rateLimiter = require('../config/rateLimiter')
const db = require('../db/db')



AcceptDeclineRouter.get('/my-applicants/:job_id' , verifyToken , async(req,res) => {

    const [ checkJob ] = await db.query('select * from jobs where job_id = ? and user_id = ? ' , [req.params.job_id , req.user.userId])
    
    if(checkJob.length < 1) return res.status(404)

    const [ Applicants ] = await db.query('select * from applied_jobs where job_id = ?', [req.params.job_id])

    if(Applicants.length < 1) return res.status(200).json([])

    const applicantIds = Applicants.map(applicant => applicant.applicant_id)
    const applicantQueries = applicantIds.map(applicantId => db.query('select user_id ,user_name ,user_surname from users where user_id = ? ' , [applicantId]))
    const applicantResults = await Promise.all(applicantQueries)
    const filteredUsers = applicantResults.filter(Boolean)
    const applicantLists = filteredUsers.map(filteredUser => filteredUser[0][0])

    const technologiesQueries = applicantIds.map(applicantId => db.query('select * from user_technologies where user_id = ?',[applicantId]))
    const technologiesResults = await Promise.all(technologiesQueries)
    const filteredTechnologies = technologiesResults.map(([AT]) => AT[0] ?? []  )
    
    const rolesQueries = applicantIds.map(applicantId => db.query('select * from user_roles where user_id = ?' , [applicantId]))
    const rolesResults = await Promise.all(rolesQueries)
    const filteredRoles = rolesResults.map(([R]) => R[0] ?? []  )


    const data = (applicantLists.map(applicant => ({applicant : applicant , technologies : filteredTechnologies.filter(technologies => technologies.user_id === applicant.user_id ?? []) , roles : filteredRoles.filter(roles => roles.user_id === applicant.user_id ?? [])})))


    return res.status(200).json(data)
})

AcceptDeclineRouter.get('/:applicant_id/:job_id', verifyToken , async (req, res) => {
    
    const { applicant_id, job_id } = req.params;

    const [ rows ]= await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [applicant_id, job_id])

    if(rows.length < 1){
        return res.status(200).json({message : 'You Have Not Responded To This Employee Yet', status : true})
    }

    if(rows.status === 'true')return res.status(200).json({message : 'You Have Already Accepted This Employee', status : true})
    return res.status(200).json({message : 'You Have Already Accepted This Employee', status : false})

})

AcceptDeclineRouter.post('/accept-decline-employee', rateLimiter , verifyToken , async(req,res) => {

    const AcceptDeclineResep = AcceptDeclineSchema(req.body)

        if(!AcceptDeclineResep.success){
            return res.status(400).json('Invalid Input')
        }


    try{

        const [ rows ] = await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [req.body.applicant_id , req.body.job_id])
        

        if(rows.length > 1){

            return res.status(200).json('already sended response to this employee')

        }

        await db.query('insert into AcceptedDeclined (job_id, applicant_id , status, recruiter_id) values (? , ? , ? , ?)' , [req.body.job_id, req.body.applicant_id , req.body.status , req.user.userId])

        if(req.body.status === 'false') return res.status(200).json({message : `You Have Successfully Declined Employee` , status : req.body.status})
        return res.status(200).json({message : `You Have Successfully Accepted Employee` , status : req.body.status})
        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter