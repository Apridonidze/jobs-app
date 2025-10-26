import { useEffect, useState } from "react"

const FilteredJobs = ( { jobs } ) => {

    //job_employeeList, job_technologies, generate based on this parameters 

    const [filteredJobs, setFilteredJobs] = useState([])

    useEffect(() => {

        console.log(jobs)
        console.log(user)
        //jobs.job_technologies
        //jobs.job_technologies

        //import my technologies from technologies.js 
        //import my role from role.js
        //change temprary variables into this fetched variables  


        const filtered = jobs.filter(job => job.job_technologies.includes('TypeScript') && job.job_employeeList.includes('Figma Designer'))
        setFilteredJobs(filtered)

        console.log(filtered)
        
    },[jobs])


    return(
        <div className="filtered-jobs-container">
            <h1>Jobs For You: </h1>
        </div>
    )
}


export default FilteredJobs