import JobHolder from "./JobHolder"

const Applied = ( {user , jobs, savedJobs ,appliedJobs }) => {
    
    return (
        <div className="applied-container">
            <h1>Your Applied Jobs:</h1>
            {jobs !== null && user && jobs.length > 0 ? jobs.map(job => 
                <JobHolder job={job} user={user} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    )
}


export default Applied