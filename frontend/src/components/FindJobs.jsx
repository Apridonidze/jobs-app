import FindJobsMessage from "../alerts/FindJobsMessage";
import FilteredJobs from "./FilteredJobs"; //importing components

const FindJobs = ( { isProfileFinished, jobs } ) => {
        
    return(
        <div className="create-jobs-container container my-3" style={{minHeight : '60vh'}}>
            {isProfileFinished && !isProfileFinished ? <FindJobsMessage /> : <FilteredJobs jobs={jobs} />} 

        </div>
    );
};//checks if user profile is finished and if so it returns filtered jobs that are filtered based on users technologies , language and role else it returns message that user has to finish their profile to generate jobs based on their preferences

export default FindJobs;//exporting component