import FindJobsMessage from "../alerts/FindJobsMessage"
import FilteredJobs from "./FilteredJobs"
const FindJobs = ( { isProfileFinished, jobs } ) => {
        
    return(
        <div className="create-jobs-container ">
            {isProfileFinished && !isProfileFinished ? <FindJobsMessage /> : <FilteredJobs jobs={jobs}/>} 

        </div>
    )
}


export default FindJobs