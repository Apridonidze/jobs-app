import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


const JobListings = () => {

    const [cookies] = useCookies(['token'])

    const JOBS_URL = 'http://localhost:8080/jobs/job-listing'

    const [jobs,setJobs] = useState([])
    const [jobsErr,setJobsErr] = useState('')
    
    useEffect(() => {
        axios
        .get(JOBS_URL, {headers : {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => setJobs(resp.data.jobs))
        .catch(err => setJobsErr(err.response.data.error))
    },[])

    return (
        <div className="job-listing-container d-flex flex-column">
            Job Listings
            {jobs.reverse().map((job,jobId) => (
                <span key={jobId}>{job.job_title}</span>
            ))}
        </div>
    )
}


export default JobListings