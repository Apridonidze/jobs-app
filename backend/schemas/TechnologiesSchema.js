const z = require('zod');//importing zod

const TechnologiesSchema = z.object({
    technologies : z.array(z.string().min(1, "Technologies cannot be empty")).nonempty("Technologies Fileds Are Empty"),
}) ;//creating zod object to validate data in this pattern


function validateTechSchema (data) {
    return TechnologiesSchema.safeParse(data)

}


module.exports = validateTechSchema