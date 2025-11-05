import { useEffect, useState } from "react"
import axios from 'axios'

import { useCookies } from 'react-cookie'

const Applied = () => {

    const [cookies] = useCookies(['token'])
    const MY_APPLIED_JOBS_URL = 'http://localhost:8080/applied/my-applied-jobs'
    const [appliedJobs,setAppliedJobs] = useState([])

    useEffect(() => {
        const FetchUserJobs = async() => {

            try{

                await Promise.all([
                    axios.get(MY_APPLIED_JOBS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) console.log('no jobs applied')
                        else setAppliedJobs([resp.data])
                    })
                ])
                
            }catch(err){
                console.log(err)
            }

        }

        FetchUserJobs()
    },[])

    return (
        <div className="applied-container">
            <h1>Your Applied Jobs:</h1>
            {appliedJobs && appliedJobs.map(appliedJob => (
                <span key={appliedJob.job_id}>{appliedJob.job_id}</span>
            ))}
        </div>
    )
}


export default Applied