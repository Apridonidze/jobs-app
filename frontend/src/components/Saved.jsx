import JobHolder from './JobHolder'


const Saved = ( { user , jobs, handleSave , handleApply } ) => {

    

    return (
        <div className="saved-container">
            <h1>Your Saved Jobs:</h1>
            
           {jobs && user && jobs.length > 0 ? jobs.map(job => 
                <JobHolder job={job} user={user} handleSave={handleSave} handleApply={handleApply}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    )
}


export default Saved