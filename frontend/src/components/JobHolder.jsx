import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


const JobHolder = ( {user, job , handleSave , handleApply} ) => {

    const [cookies] = useCookies(['token'])
    

    const IS_SAVED_URL = 'http://localhost:8080/saved/check-job'
    const IS_APPLIED_URL = 'http://localhost:8080/applied/check-applied'

    

    const [isApplied , setIsApplied]  = useState(false)
    const [isSaved , setIsSaved]  = useState(false)

   

    
    useEffect(() => {

        const fetchJobStatus = async() => {
            try{
                await Promise.all([
                axios.get(`${IS_SAVED_URL}/${job.job_id}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {setIsSaved(resp.data) ;console.log(resp.data)}),
                axios.get(`${IS_APPLIED_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {setIsApplied(resp.data) ; console.log(resp.data)}),
                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchJobStatus()

    },[ ])


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
                <h4>Job Status : {user.role !== 'Recruiter' ? '' : 'nmot '}</h4>
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