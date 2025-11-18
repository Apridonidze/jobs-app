import JobHolder from './JobHolder'; //importing react component

const Saved = ( { user , jobs, savedJobs, appliedJobs } ) => {

    return (
        <div className="saved-container container d-flex flex-column mt-5 " style={{minHeight : '60vh'}}>
            <div className="saved-header mb-3">
            
                <h1>Your Saved Jobs:</h1>
            
            </div>
            
            <div className="saved-body row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 align-items-stretch my-2">
                
                {jobs && user && jobs.length > 0 ? jobs.map(job => (
                    <div className="col" key={job.job_id}>
                        <JobHolder job={job} user={user} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
                    </div>
                ))
                : <h1>No Jobs Applied Yet</h1>}
                    
            </div>
        </div>
    );
}; //component checks if jobs are fetched from server and then displayes saved jobs if employee has any else it returns no jobs applied


export default Saved; //exporting component