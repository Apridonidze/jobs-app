import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

import JobHolder from './JobHolder'
const Saved = () => {

    const [cookies] = useCookies(['token'])

    const SAVED_URL = 'http://localhost:8080/saved/my-saved-jobs'

    const [user , setUser] = useState(null)
    const [jobs , setJobs] = useState(null)
    const [status , setStatus] = useState(null)

    useEffect(() => {
        const fetchSaved = async() => {
            try{

                await Promise.all([
                    axios.get(SAVED_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(!resp.data.status)setJobs(null) , setUser(resp.data.user), setStatus(resp.data.status)
                        else setJobs([resp.data.jobs]) , setUser(resp.data.user), setStatus(resp.data.status)
                    })
                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchSaved()
    },[])

    return (
        <div className="saved-container">
            <h1>Your Saved Jobs:</h1>
            {status && status ? jobs.map(job => 
                <JobHolder job={job} user={user}/>
            )
            :<h1>no jobs</h1>}
        </div>
    )
}


export default Saved