import JobHolder from './JobHolder'; //importing react component

const Saved = ( { user , jobs, savedJobs, appliedJobs } ) => {

    return (
        <div className="saved-container">
            <h1>Your Saved Jobs:</h1>
            
           {jobs && user && jobs.length > 0 ? jobs.map(job => 
                <JobHolder job={job} user={user} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    );
}; //component checks if jobs are fetched from server and then displayes saved jobs if employee has any else it returns no jobs applied


export default Saved; //exporting component