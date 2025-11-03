import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import JobHolder from "./JobHolde"

const SeeMore = ( {toggleSeeMore} ) => {

    const [ cookies ] = useCookies(['token'])
    const [job, setJob] = useState(null)
    const [applicants,setApplicants] = useState(null)
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'
    const APPLICANTS_URL = 'http://localhost:8080/accept-decline/my-job-application'
    
    const PENDINGS_URL = 'http://localhost:8080/accept-decline/my-applicants'

    useEffect(() => {
        const fetchJob = async() => {


            try{
                await Promise.all([
                axios.get(`${JOBS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => {setJob(resp.data[0])}),
                axios.get(`${PENDINGS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => {setApplicants(resp.data)})
            ])
            }catch(err){
                console.log(err)
            }
        }
        

        fetchJob()
    },[])


    console.log(applicants)
    console.log(job)

    


    //job_id, user_id, job_title, job_desc, job_employeeList, job_technologies, job_languages

    return(
        <div className="see-more-container position-fixed bg-white">
            {job && applicants && <JobHolder job={job} applicants={applicants}/>}
        </div>
    )
}

export default SeeMore