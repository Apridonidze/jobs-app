import axios from "axios"
import { useEffect, useState } from "react"


const JobListings = () => {

    const JOBS_URL = 'http://localhost:8080/jobs'

    const [jobs,setJobs] = useState([])
    const [jobsErr,setJobsErr] = useState('')
    
    useEffect(() => {
        axios
        .get(JOBS_URL)
        .then(resp => {setJobs(resp.data.jobs)})
        .catch(err => setJobsErr(err.response.data.error))
    },[])

    return (
        <div className="job-listing-container d-flex flex-column">
            Job Listings
            {jobs.reverse().map((e,i) => (
                <span key={i}>{e.job_title}</span>
            ))}
        </div>
    )
}


export default JobListings