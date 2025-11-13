const z = require('zod')

const AcceptDeclineSchema = z.object({
    applicant_id : z.number(),
    job_id : z.number(),
    status : z.enum([true,false])
})


function validateAcceptDecline (data) {
    
    return AcceptDeclineSchema.safeParse(data)
}


module.exports = validateAcceptDecline