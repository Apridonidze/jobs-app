const Job = ( { jobId , job } ) => {

    return(
        <div className="job-container col col-6 border border-1 justify-content-between " key={jobId}>
            <div className="job-header">
            
                <h4 className="text-break">{job.job_title}</h4>
                <h6 className="text-break">{job.job_desc}</h6>
            
            </div>
            
            <div className="job-footer">
                
                <h6>Looking For : {job.job_employeeList}</h6>
                <h6>Technologies : {job.job_technologies}</h6>
            
            </div>

           <div className="buttons row d d-flex flex-column gap-2">
                <div className="buttons-header d d-flex gap-2 col">
                    <button className="btn btn-success w-50">Apply</button>
                    <button className="btn border border-2 border-success w-50">Save</button>
                </div>
                <div className="buttons-footer col">
                    <button className="btn btn-primary w-100">See More...</button>
                </div>
           </div>
        </div>
    )
}


export default Job