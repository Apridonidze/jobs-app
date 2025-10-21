const z = require('zod')

const RoleSchema = z.object({
    roles : z.array(z.string().min(1, "Tag cannot be empty")).nonempty("Tag Fileds Are Empty"),
})

function validateRoles (data) {
    return RoleSchema.safeParse(data)
}


module.exports = validateRoles