import { useEffect, useState } from "react"

const FilteredJobs = ( { jobs } ) => {

    //job_employeeList, job_technologies, generate based on this parameters 

    const [filteredJobs, setFilteredJobs] = useState([])

    useEffect(() => {

        //take jobs jhere filter it based on job.tags and job.technologies and display mapped filtered jobs in div

    },[])

    return(
        <div className="filtered-jobs-container">
            <h1>Jobs For You: </h1>
             
        </div>
    )
}


export default FilteredJobs