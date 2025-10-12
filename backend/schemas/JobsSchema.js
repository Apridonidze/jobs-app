const z = require('zod')

const jobsSchema = z.object({
    title : z.string().min(6).max(55),
    desc : z.string().min(25).max(500),
    employeeList: z.array(z.string()).min(1).max(10),
    technologies: z.array(z.string()).min(1).max(26), 
    languages :  z.array(z.string()).min(1).max(3)
})

function JobsSchema (data) {
    return jobsSchema.safeParse(data)
}


module.exports = JobsSchema