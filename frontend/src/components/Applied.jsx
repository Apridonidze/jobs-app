import JobHolder from "./JobHolder"; //importing react component

const Applied = ( {user , jobs, savedJobs ,appliedJobs }) => {
    
    return (
        <div className="applied-container container d-flex flex-column mt-5 min-vh-100">
            <div className="applied-header">
                
                <h1>Your Applied Jobs:</h1>
            
            </div>

            <div className="applied-body">
            
                {jobs !== null && user && jobs.length > 0 ? jobs.map(job => 
                    <JobHolder job={job} user={user} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
                ) : <h1>No Jobs Applied Yet</h1>}
            
            </div>
        </div>
    );
}; //component checks if jobs are fetched for server , then it checks if you have jobs applied and returns jobs lists , else retuns no jobs applied


export default Applied; //exporting compoentn