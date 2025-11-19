const z = require('zod'); //importing zod

const AcceptDeclineSchema = z.object({
    applicant_id : z.number(),
    job_id : z.number(),
    status : z.enum([true,false])
});//creating zod object to validate data in this pattern

function validateAcceptDecline (data) {
    
    return AcceptDeclineSchema.safeParse(data); //validates data into pattern
};

module.exports = validateAcceptDecline;//exports schema