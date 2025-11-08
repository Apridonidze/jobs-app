import axios from "axios"
import { useEffect , useState } from "react"
import { useCookies } from "react-cookie"

const Job = ( { job , user, setToggleSeeMore, handleSave ,handleApply } ) => {


     const [cookies] = useCookies(['token'])
    
    const APPLY_URL = 'http://localhost:8080/applied/post-my-applied-jobs' 
    const SAVE_URL = 'http://localhost:8080/saved/post-my-saved-jobs'
    
    const IS_SAVED_URL = 'http://localhost:8080/saved/check-job'
    const IS_APPLIED_URL = 'http://localhost:8080/applied/check-applied'

    const MY_JOB_STATUS_URL = 'http://localhost:8080/toggle-job'


    const [isApplied, setIsApplied] = useState(null)
    const [isSaved, setIsSaved] = useState(null)

     useEffect(() => {

        const fetchJobStatus = async() => {
            try{
                await Promise.all([
                axios.get(`${IS_SAVED_URL}/${job.job_id}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {setIsSaved(resp.data); console.log('issaved ' + resp.data)}),
                axios.get(`${IS_APPLIED_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {setIsApplied(resp.data) ; console.log('is applied' + resp.data)}),
            ])

            }catch(err){
                console.log(err)
            }
        }

        fetchJobStatus()

    },[])



    return(
        <div className="job-container col-5 border border-1 d-flex flex-column  justify-content-between min-vh-50 py-2" key={job.job_id}>
            <div className="job-header">
            
                <h4 className="text-break">{job.job_title}</h4>
                <h6 className="text-break">{job.job_desc}</h6>
            
            </div>
            
            <div className="job-footer">
                
                <h6>Looking For : {job.job_employeeList}</h6>
                <h6>Technologies : {job.job_technologies}</h6>
            
            </div>

           <div className="buttons row d d-flex flex-column gap-2">
                
                    {user && user.role !== 'Recruiter' && 
                        <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                            {isApplied ? <button className="btn btn-success opacity-50 w-50">Applied</button> : <button className="btn btn-success w-50" onClick={() =>handleApply(job.job_id)}>Apply</button>}
                            {isSaved ? <button className="btn opacity-75 border w-50 position-relative">Saved</button> : <button className="btn border w-50" onClick={() => handleSave(job.job_id)}>Save</button>}
                        </div>
                    }
                
                <div className="buttons-footer col">
                    <button className="btn btn-primary w-100" onClick={() => {setToggleSeeMore({status: true , job_id : job.job_id})}}>See More...</button>
                </div>
           </div>
        </div>
    )
}


export default Job