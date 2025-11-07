import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import JobHolder from "./JobHolder"

const SeeMore = ( { toggleSeeMore, user } ) => {

    const [cookies] = useCookies(['token'])
    const [job,setJob] = useState(null)
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    useEffect(() => {
        
        const fetchJob = async() => {

            try{
                await Promise.all([
                    axios.get(`${JOBS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {setJob(resp.data[0])})
                ])

            }catch(err){
                console.log(err)
            }

        }

        fetchJob()

    },[])

    return (
        <div className="see-more-container position-fixed bg-white z-50" style={{zIndex: 1055}}>
            {job  && <JobHolder job={job} user={user} />}
        </div>
    )
}


export default SeeMore