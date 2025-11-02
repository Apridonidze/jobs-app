import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import MyJob from "./MyJob"

const MyJobs = () => {

    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    const [cookies] = useCookies(['token'])

    const [yourJobs,setYourJobs] = useState([])
    const [noJobsFound,setNoJobsFound] = useState('')

    const [toggleSeeMore, setToggleSeeMore] = useState({status : null , job_id : null})

    useEffect(() => {

        try{
             axios.get(JOBS_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => {setYourJobs(resp.data.jobs)})

        }catch(err){
            setNoJobsFound(err.response.data.error)
        }

    },[])//make promise in try block 

    return (
        <div className="my-jobs-container d-flex flex-column">

            {toggleSeeMore.status && <h1>asd</h1>} {/* toggle see more component when true */}

            <h1>Jobs Created By You: </h1>
            {yourJobs.reverse().map((job,jobId) => (
                <MyJob key={jobId} job={job} jobId={jobId} setToggleSeeMore={setToggleSeeMore}/>
            ))}
            {noJobsFound}
        </div>
    )// toggle loading when yourjobs === null ,toggle nojobs found componet if yourjobs.length < 1
}

export default MyJobs