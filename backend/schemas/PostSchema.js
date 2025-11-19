const z = require('zod');//importing zod

const postSchema = z.object({
    postInput : z.string()
});//creating zod object to validate data in this pattern

function validatePost (data) {
    
    return postSchema.safeParse(data);//validating input and returnig response 

} ;

module.exports = validatePost;//exporting schema