const Job = ( { jobId , job } ) => {

    console.log(job)
    return(
        <div className="job-container col border border-1 d-flex flex-column justify-content-between" key={jobId}>
            <div className="job-header">
                <h4>{job.job_title}</h4>
            <h6>{job.job_desc}</h6>
            </div>
            <div className="job-footer">
                
            <h6>Looking For : {job.job_employeeList}</h6>
            <h6>Technologies : {job.job_technologies}</h6>
            </div>
        </div>
    )
}


export default Job