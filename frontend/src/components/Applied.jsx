import JobHolder from "./JobHolder"

const Applied = ( {user , jobs, handleSave , handleApply }) => {
    
    return (
        <div className="applied-container">
            <h1>Your Applied Jobs:</h1>
            {jobs !== null && user && jobs.length > 0 ? jobs.map(job => 
                <JobHolder job={job} user={user} handleSave={handleSave} handleApply={handleApply}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    )
}


export default Applied