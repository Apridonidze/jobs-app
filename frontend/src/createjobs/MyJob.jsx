import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
const MyJob = ( { job ,setToggleSeeMore} ) => {

    const [count,setCount] = useState(0)
    const [cookies] = useCookies(['token'])
    const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants'

    useEffect(() => {
        const fetchUserCount = async() => {
            try{

                await axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(res => setCount(res.data.length))

            }catch(err){
                console.log(err)
                setCount(0)
            }
        }

        fetchUserCount()
    },[])

    return(
        <div className="my-job-container container py-2" key={job.job_id}>
            <h3>{job.job_title}</h3>
            <h4>{job.job_desc}</h4>
            <h4>applicants : {count}</h4>

            <button onClick={() => setToggleSeeMore({status:true , job_id : job.job_id})}>See More</button>
        </div>
    )
}


export default MyJob