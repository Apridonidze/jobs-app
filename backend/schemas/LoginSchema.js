const z = require('zod')

const loginSchema = z.object({
    email : z.email(),
    password : z.string().min(3),
})

function LoginSchema (data) {

    return loginSchema.safeParse(data)

}


module.exports = LoginSchema