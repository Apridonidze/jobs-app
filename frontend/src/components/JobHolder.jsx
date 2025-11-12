import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


const JobHolder = ( {user, job , savedJobs ,appliedJobs } ) => {

    const [cookies] = useCookies(['token'])
    

    const IS_SAVED_URL = 'http://localhost:8080/saved/check-job'
    const IS_APPLIED_URL = 'http://localhost:8080/applied/check-applied'

    

    const [isApplied , setIsApplied]  = useState(false)
    const [isSaved , setIsSaved]  = useState(false)

    
    const SAVE_URL = 'http://localhost:8080/saved'
    const APPLY_URL = 'http://localhost:8080/applied'


    const handleSave = async() => {
        const res = await axios.post(`${SAVE_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}})
        console.log(res)
        setIsSaved(true)
    }

    
    const handleApply = async() => {
        
        const res = await axios.post(`${APPLY_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}})
        console.log(res)
        setIsApplied(true)
    }

   
      useEffect(() => {
        
        const filterSavedJob = async() =>{
            const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == job.job_id)
        if(savedJobList.length > 0){

            if(savedJobList[0].job_id === job.job_id) setIsSaved(true)
        }
        return 
        }

        const filterAppliedJob = async() =>{
            const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == job.job_id)
        if(appliedJobList.length > 0){

            if(appliedJobList[0].job_id === job.job_id) setIsApplied(true)
                else return
        }
        } 

        filterSavedJob()
        filterAppliedJob()

     },[savedJobs,appliedJobs])


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
                <h4>Job Status : {user.role !== 'Recruiter' ? 'employee' : 'nmot '}</h4>
            </div>

            <div className="buttons-header d d-flex gap-2 col">

                    
                    <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                        {isApplied ? <button className="btn btn-success opacity-50 w-50">Applied</button> : <button className="btn btn-success w-50" onClick={() => handleApply(job.job_id)}>Apply</button>}
                        {isSaved ? <button className="btn opacity-75 border w-50 position-relative">Saved</button> : <button className="btn border w-50" onClick={() =>handleSave(job.job_id)}>Saved</button>}
                    </div>
                

            </div>

            
        </div>
    )
}// add layout and design for it


export default JobHolder