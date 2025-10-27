const z = require('zod')

const TechnologiesSchema = z.object({
    technologies : z.array(z.string().min(1, "Technologies cannot be empty")).nonempty("Technologies Fileds Are Empty"),
}) 


function validateTechSchema (data) {

    return TechnologiesSchema.safeParse(data)

}


module.exports = validateTechSchema