import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import Job from "./Job"

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
        <div className="job-listing-container container gap-3">
            <h1>Job Listing : </h1>
            <div className="job-listing row gap-3">
            {jobs.reverse().map((job,jobId) => (
                <Job jobId={jobId} job={job}/>
            ))}
            </div>
        </div>
    )
}


export default JobListings