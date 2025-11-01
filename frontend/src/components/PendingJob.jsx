import Applicant from "./Applicant"

const PendingJob = ( { job, applicants,setToggleAcceptDecline } ) => {

   
        

    return ( 

        <div className="pending-job-container">
            
            <h3 key={job.job_id}>{job.job_title}</h3>

            {applicants?.map(applicant => (
                <Applicant applicant={applicant}/>
            ))
            }

            <button onClick={() => setToggleAcceptDecline({status:true , job_id : job.job_id})}>Accept/Deciline Applicant</button>

           
        
        </div>
        
    )
} 

export default PendingJob