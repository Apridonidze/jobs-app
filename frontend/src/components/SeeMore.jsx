import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import JobHolder from "../createjobs/JobHolde"

const SeeMore = ( { toggleSeeMore } ) => {

    const [cookies] = useCookies(['token'])
    const [job,setJob] = useState(null)
    const [applicants, setApplicants] = useState(null)
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'
    const PENDINGS_URL = 'http://localhost:8080/accept-decline/my-applicants'

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
        <div className="see-more-container position-fixed bg-white">
            {job && applicants && <JobHolder job={job} applicants={applicants} />}
        </div>
    )
}


export default SeeMore