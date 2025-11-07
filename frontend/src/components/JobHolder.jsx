import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


const JobHolder = ( {user, job} ) => {

    const [cookies] = useCookies(['token'])
    
    const APPLY_URL = 'http://localhost:8080/applied/post-my-applied-jobs' 
    const SAVE_URL = 'http://localhost:8080/saved/post-my-saved-jobs'

    const IS_SAVED_URL = 'http://localhost:8080/saved/check-job'
    const IS_APPLIED_URL = 'http://localhost:8080/applied/check-applied'

    const MY_JOB_STATUS_URL = 'http://localhost:8080/accept-decline/my-job-status'

    const [applied, setApplied] = useState(null)
    const [saved, setSaved] = useState(null)
    

    const [isApplied , setIsApplied]  = useState(false)
    const [isSaved , setIsSaved]  = useState(false)

    const handleApply = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(APPLY_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => setApplied({message : resp.data.message, status : resp.data.status})) ,setIsApplied(true)
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
                .then(resp => {setSaved({message : resp.data.message, status : resp.data.status}) , setIsSaved(true)})
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
                axios.get(`${IS_APPLIED_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => setIsApplied(resp.data)),
            ])

            }catch(err){
                console.log(err)
            }
        }

        fetchJobStatus()

    },[isSaved , isApplied ])


    return(
        <div className="job-holder-container" key={job.job_id}>
            <div className="job-info">
                    
                <h1>{job.job_title}</h1>
                <h2>{job.job_desc}</h2>
                <h3>{job.job_employeeList}</h3>
                <h3>{job.job_technologies}</h3>
                <h3>{job.job_languages}</h3>
            </div>

            
            <div className="job-status">
                <h4>Job Status :</h4>
            </div>

            <div className="buttons-header d d-flex gap-2 col">

                {user.role !== 'Recruiter' && isSaved !== null && isApplied !== null &&
                    
                    <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                        {isApplied ? <button className="btn btn-success opacity-50 w-50">Applied</button> : <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>}
                        {isSaved ? <button className="btn opacity-75 border w-50">Saved</button> : <button className="btn border w-50" onClick={handleSave}>Saved</button>}
                    </div>
                
                }                

            </div>

            
        </div>
    )
}// add layout and design for it


export default JobHolder