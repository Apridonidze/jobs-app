const z = require('zod')

const postSchema = z.object({
    postInput : z.string()
})

function validatePost (data) {
    
    return postSchema.safeParse(data)

} 


module.exports = validatePost