const z = require('zod');//imported zod

const tagsSchema = z.object({
    tags: z.array(z.string().min(1, "Tag cannot be empty")).nonempty("Tag Fileds Are Empty"),
});//creating zod object to validate data in this pattern

function validateTags (data){
    return tagsSchema.safeParse(data);//validating input and returning response
};

module.exports = validateTags;//exporting schema