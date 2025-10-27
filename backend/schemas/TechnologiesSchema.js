const z = require('zod')

const TechnologiesSchema = z.object({
    technologies : z.array().min(1).nonempty('Input Should Not Be Empty')
}) 


function validateTechSchema (data) {

    return TechnologiesSchema.safeParse(data)

}


module.exports = validateTechSchema