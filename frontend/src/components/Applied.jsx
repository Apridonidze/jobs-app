import JobHolder from "./JobHolder"; //importing react component

const Applied = ( {user , jobs, savedJobs ,appliedJobs }) => {
    
    return (
        <div className="applied-container container d-flex flex-column mt-5" style={{minHeight : '60vh'}}>
            <div className="applied-header">
                
                <h1>Your Applied Jobs:</h1>
            
            </div>

            <div className="applied-body row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 align-items-stretch my-2">
            
                {jobs !== null && user && jobs.length > 0 ? jobs.map(job => 
                    (<div className="col">
                        <JobHolder job={job} user={user} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
                    </div>)
                ) : <h1>No Jobs Applied Yet</h1>}
            
            </div>
        </div>
    );
}; //component checks if jobs are fetched for server , then it checks if you have jobs applied and returns jobs lists , else retuns no jobs applied


export default Applied; //exporting compoentn