const z = require('zod')

const postSchema = z.object({
    userId : z.number(),
    post : z.string().max(500)
})

function validatePost ([postData]) {
    return z.safeParse(postData)
} 


module.exports = validatePost