const z = require('zod')

const AcceptDeclineSchema = z.object({
    applicant_id : z.number().min(0),
    status : z.boolean()
})


function validateAcceptDecline (data) {
    return AcceptDeclineSchema.safeParse(data)
}


export default validateAcceptDecline