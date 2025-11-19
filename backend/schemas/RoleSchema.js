const z = require('zod');//importing zod

const RoleSchema = z.object({
    roles : z.array(z.string().min(1, "Tag cannot be empty")).nonempty("Tag Fileds Are Empty"),
})//creating zod object to validate data in this pattern

function validateRoles (data) {
    return RoleSchema.safeParse(data);//validating input and returning response
};

module.exports = validateRoles; //exporting schema