import { useEffect, useState } from "react"
import axios from 'axios'

import { useCookies } from 'react-cookie'
import JobHolder from "./JobHolder"

const Applied = () => {

    const [cookies] = useCookies(['token'])
    const MY_APPLIED_JOBS_URL = 'http://localhost:8080/applied/my-applied-jobs'
    const MY_USER_URL = 'http://localhost:8080/user/user'
    const [appliedJobList,setAppliedJobList] = useState(null)
    const [user, setUser] = useState()

    useEffect(() => {
        const FetchUserJobs = async() => {

            try{

                await Promise.all([
                    axios.get(MY_APPLIED_JOBS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) setAppliedJobList(null)
                        else  setAppliedJobList([resp.data]) , setUser(resp.data.user) 
                    }),
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
            {appliedJobList !== null && <h1>{appliedJobList.map(appliedJob => (
                appliedJob.Job.map(job => (
                    <JobHolder job={job} user={user}/>
                ))
            ))}</h1>}
        </div>
    )
}


export default Applied