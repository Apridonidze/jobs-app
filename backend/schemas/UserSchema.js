const z = require('zod'); //importing zod

const userSchema = z.object({
    role: z.enum(['recruiter','employee']),
    name : z.string().min(3),
    surname : z.string().min(3),
    password : z.string().min(3),
    email : z.email(),
    phoneNumber : z.string().min(8),
    birthDate : z.string().length(10 , {message : 'invalid birth input'}),
    gender : z.enum(['male','female'])
});//creating zod object to validate data in this pattern

function validateUser (data) {

    return userSchema.safeParse(data); //validating input and returnign response
    
};

module.exports = validateUser;//exporting schema