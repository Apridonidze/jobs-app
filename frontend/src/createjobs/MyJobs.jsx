import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const MyJobs = () => {

    const JOBS_URL = 'http://localhost:8080/jobs'

    const [cookies,setCookies,removeCookies] = useCookies(['token'])

    const [yourJobs,setYourJobs] = useState([])
    const [noJobsFound,setNoJobsFound] = useState('')

    useEffect(() => {
        axios.get(JOBS_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => {setYourJobs(resp.data.jobs)})
        .catch(err => {setNoJobsFound(err.response.data.error)})
    },[])

    return (
        <div className="my-jobs-container d-flex flex-column">
            my jobs
            {yourJobs.map((e,i) => (
                <span key={i}>{e.job_title}</span>
            ))}
            {noJobsFound}
        </div>
    )
}

export default MyJobs