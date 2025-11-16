import JobHolder from './JobHolder'; //importing react component

const Saved = ( { user , jobs, savedJobs, appliedJobs } ) => {

    return (
        <div className="saved-container container d-flex flex-column mt-5 " style={{minHeight : '60vh'}}>
            <div className="saved-header mb-3">
            
                <h1>Your Saved Jobs:</h1>
            
            </div>
            
            <div className="saved-body">
                
                {jobs && user && jobs.length > 0 ? jobs.map(job => 
                    <JobHolder job={job} user={user} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
                ) : <h1>No Jobs Applied Yet</h1>}
            </div>
        </div>
    );
}; //component checks if jobs are fetched from server and then displayes saved jobs if employee has any else it returns no jobs applied


export default Saved; //exporting component