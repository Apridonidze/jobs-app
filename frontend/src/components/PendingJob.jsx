import axios from "axios"
import Applicant from "./Applicant"
import { useCookies } from "react-cookie"

const PendingJob = ( { job, applicants } ) => {

    const [cookies] = useCookies(['token'])
    const PENDING_RESPONSE_URL = ''
    
    const handleApplicantResponse = async(e) =>{
        e.preventDefault()
        console.log(e.target.value)


        try{

            await Promise.all([
                axios.post(PENDING_RESPONSE_URL , e.target.value , {headers: {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])

        }catch(err){
            console.log(err)
        }

    }
        

    return ( 

        <div className="pending-job-container">
            
            <h3 key={job.job_id}>{job.job_title}</h3>

            {applicants?.map(applicant => (
                <Applicant applicant={applicant}/>
            ))
            }

            <div className="buttons-container">
                <button className="btn bnt-success" onClick={(e) => {handleApplicantResponse(e)}} value={true}>Accept</button>
                <button className="btn btn-danger" onClick={(e) => {handleApplicantResponse(e)}} value={false}>Decline</button>
            </div>
        
        </div>
        
    )
} 

export default PendingJob