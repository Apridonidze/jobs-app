import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const SeeMore = ( {toggleSeeMore} ) => {

    const [ cookies ] = useCookies(['token'])
    const [job, setJob] = useState(null)
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    useEffect(() => {
        const fetchJob = async() => { 
            try{
                await Promise.all([
                axios.get(`${JOBS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => setJob(resp.data[0]))
            ])
            
            }catch(err){
                console.log(err)
            }
        }

        fetchJob()
    },[])


    //job_id, user_id, job_title, job_desc, job_employeeList, job_technologies, job_languages

    return(
        <div className="see-more-container position-fixed bg-white">
            {job && <>
                <h1>{job.job_title}</h1>
                <h2>{job.job_desc}</h2>
                <h3>{job.job_employeeList}</h3>
                <h3>{job.job_technologies}</h3>
                <h3>{job.job_languages}</h3>
            </>}
        </div>
    )
}

export default SeeMore