const z = require('zod')


const descSchema = z.object({
    desc : z.string().min(20).max(500)
})


function validateDesc (data){

    return descSchema.safeParse(data)

}


module.exports = validateDesc