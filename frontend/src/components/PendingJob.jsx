import Applicant from "./Applicant"

const PendingJob = ( { job, applicants } ) => {
    return ( 
        <div className="pending-job-container">
            <h3 key={job.job_id}>{job.job_title}</h3>

            {applicants?.map(applicant => (
                <Applicant applicant={applicant}/>
            ))
            }
            <button>See More</button>
        </div>
    )
} 

export default PendingJob