const z = require('zod');//importing zod

const descSchema = z.object({
    desc : z.string().min(20).max(1500)
});//creating zod object to validate data in this pattern


function validateDesc (data){

    return descSchema.safeParse(data); //validating data and retrurning response

};

module.exports = validateDesc;//exporting schema