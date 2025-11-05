import { useEffect, useState } from "react"
import axios from 'axios'

import { useCookies } from 'react-cookie'
import JobHolder from "./JobHolder"

const Applied = () => {

    const [cookies] = useCookies(['token'])
    const MY_APPLIED_JOBS_URL = 'http://localhost:8080/applied/my-applied-jobs'
    const [appliedJobs,setAppliedJobs] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        const FetchUserJobs = async() => {

            try{

                await Promise.all([
                    axios.get(MY_APPLIED_JOBS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) console.log('no jobs applied')
                        else setAppliedJobs(resp.data.Job) ,setUser(resp.data.user)
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
            {appliedJobs.length ? appliedJobs.map(job => (
                
                <JobHolder job={job} user={user}/>
            )) : <h1>No Jobs Applied Yet.</h1>}
        </div>
    )
}


export default Applied