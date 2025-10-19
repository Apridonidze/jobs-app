const z = require('zod')

const tagsSchema = z.object({
    tags: z.array(z.string().min(1, "Tag cannot be empty")).nonempty("Tag Fileds Are Empty"),
})


function validateTags (data){
    return tagsSchema.safeParse(data)
}

module.exports = validateTags