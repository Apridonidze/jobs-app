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

    const statusQueris = applicantIds.map(applicantId => db.query('select * from accepteddeclined where applicant_id = ? and job_id = ?' , [applicantId , req.params.job_id]))
    const statusResults = await Promise.all(statusQueris)
    const filteredStatus = statusResults.map(([S]) => S[0] ?? [])

    const data = (applicantLists.map(applicant => ({applicant : applicant , technologies : filteredTechnologies.filter(technologies => technologies.user_id === applicant.user_id ?? []) , roles : filteredRoles.filter(roles => roles.user_id === applicant.user_id ?? []) , status : filteredStatus.filter(status => status.applicant_id === applicant.user_id ?? [])})))


    return res.status(200).json(data)
})

AcceptDeclineRouter.get('/:jobId', verifyToken , async (req, res) => {
    

    try{
        const [ applicantsStatus ] = await db.query('select * from accepteddeclined where job_id = ? and applicant_id = ?' , [req.params.jobId , req.user.userId])
        console.log(applicantsStatus)

        return res.status(200).json(applicantsStatus[0])

    }catch(err){
        return res.status(500).json('Database Error')
    }

})

AcceptDeclineRouter.post('/accept-decline-employee/:jobId/:applicantId/:status' , verifyToken , async(req,res) => {

    
    const data = {applicant_id : Number(req.params.applicantId),
        job_id : Number(req.params.jobId),
        status : Boolean(req.params.status)}


    const AcceptDeclineResep = AcceptDeclineSchema(data)

        if(!AcceptDeclineResep.success){
            return res.status(400).json('Invalid Input')
        }


    try{

        const [ rows ] = await db.query('select * from AcceptedDeclined where applicant_id = ? and job_id = ?' , [req.params.applicantId, req.params.jobId])
        

        if(rows.length > 1){

            return res.status(200).json('already sended response to this employee')

        }

        await db.query('insert into AcceptedDeclined (job_id, applicant_id , status, recruiter_id) values (? , ? , ? , ?)' , [req.params.jobId, req.params.applicantId, req.params.status, req.user.userId])

        if(req.body.status === 'false') return res.status(200).json({message : `You Have Successfully Declined Employee` , status : req.params.status})
        return res.status(200).json({message : `You Have Successfully Accepted Employee` , status : req.params.status})
        

    }catch(err){

        return res.status(500).json(`database error ${err}`)
    }

})



module.exports = AcceptDeclineRouter