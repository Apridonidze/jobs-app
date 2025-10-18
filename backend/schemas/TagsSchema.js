const z = require('zod')

const tagsSchema = z.object({
    userId : z.number().min(0),
    userTags: z.array().min(1)
})


function validateTags (){
    return tagsSchema.safeParse(data)
}

module.exports = validateTags