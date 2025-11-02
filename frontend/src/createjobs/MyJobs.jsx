import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import MyJob from "./MyJob"

const MyJobs = () => {

    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    const [cookies] = useCookies(['token'])

    const [yourJobs,setYourJobs] = useState([])
    const [noJobsFound,setNoJobsFound] = useState('')

    useEffect(() => {

        try{
             axios.get(JOBS_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => {setYourJobs(resp.data.jobs)})

        }catch(err){
            setNoJobsFound(err.response.data.error)
        }

    },[])

    return (
        <div className="my-jobs-container d-flex flex-column">
            <h1>Jobs Created By You: </h1>
            {yourJobs.reverse().map((job,jobId) => (
                <MyJob key={jobId} job={job} jobId={jobId}/>
            ))}
            {noJobsFound}
        </div>
    )
}

export default MyJobs