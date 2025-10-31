const PendingJob = ( { job } ) => {
    return ( 
        <div className="pending-job-container">
            <span key={job.job_id}>{job.job_title}</span>
        </div>
    )
} 

export default PendingJob