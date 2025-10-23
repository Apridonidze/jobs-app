import { useState } from "react"

const FilteredJobs = ( { jobs } ) => {

    //job_employeeList, job_technologies, generate based on this parameters 

    const [filteredJobs, setFilteredJobs] = useState([])

    return(
        <div className="filtered-jobs-container">
           {jobs && jobs.reverse().filter((job) => setFilteredJobs(filteredJobs => [...filteredJobs, job.job_employeeList.includes('Frontend Developer')]))}
        </div>
    )
}


export default FilteredJobs