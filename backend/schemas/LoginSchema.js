const z = require('zod');//importign zod

const loginSchema = z.object({
    email : z.email(),
    password : z.string().min(3),
}); //created zod object to validate data with this patterns

function LoginSchema (data) {

    return loginSchema.safeParse(data);//validating data and returning response

};

module.exports = LoginSchema;//exporting schema