const z = require('zod')

const tagsSchema = z.object({
    tags: z.array().min(1)
})


function validateTags (data){
    return tagsSchema.safeParse(data)
}

module.exports = validateTags