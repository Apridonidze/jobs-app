import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


const JobHolder = ( {user, job} ) => {

    const [cookies] = useCookies(['token'])
    
    const APPLY_URL = 'http://localhost:8080/applied/post-my-applied-jobs' 
    const SAVE_URL = 'http://localhost:8080/saved/post-my-saved-jobs'

    const IS_SAVED_URL = 'http://localhost:8080/saved/check-job'
    const IS_APPLIED_URL = 'http://localhost:8080/applied/check-applied'


    const [applied, setApplied] = useState(null)
    const [saved, setSaved] = useState(null)
    

    const [isApplied , setIsApplied]  = useState(null)
    const [isSaved , setIsSaved]  = useState(null)

    const handleApply = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(APPLY_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => setApplied({message : resp.data.message, status : resp.data.status}))
            ])

        }catch(err){
            console.log(err)
        }

    }

    const handleSave = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(SAVE_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => setSaved({message : resp.data.message , status : resp.data.status}))
            ])

        }catch(err){
            console.log(err)
        }

    }

    
    useEffect(() => {

        const fetchJobStatus = async() => {
            try{
                await Promise.all([
                axios.get(`${IS_SAVED_URL}/${job.job_id}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => setIsSaved(resp.data)),
                axios.get(`${IS_APPLIED_URL}/${job.job_id}`, {headers : {Authorization : `${cookies.token}`}}).then(resp => setIsApplied(resp.data)),
            ])

            }catch(err){
                console.log(err)
            }
        }

        fetchJobStatus()

    },[])


    return(
        <div className="job-holder-container" key={job.job_id}>
            <div className="job-info">
                    
                <h1>{job.job_title}</h1>
                <h2>{job.job_desc}</h2>
                <h3>{job.job_employeeList}</h3>
                <h3>{job.job_technologies}</h3>
                <h3>{job.job_languages}</h3>

            </div>

            <div className="buttons-header d d-flex gap-2 col">

                {user.role !== 'Recruiter' && applied && applied.status && applied.status}

            </div>
            
        </div>
    )
}// add layout and design for it


export default JobHolder