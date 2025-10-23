import FindJobsMessage from "../alerts/FindJobsMessage"
import FilteredJobs from "./FilteredJobs"
const FindJobs = ( { isProfileFinished, jobs } ) => {
    
    //TODO (employee side): when jobs are displayed , that jobs should have button that redirect user to that job path where he can seee everyting in details 
    // TODO (employee side): this path should have button to submit for job

    return(
        <div className="create-jobs-container ">
            {isProfileFinished !==null && !isProfileFinished ? <FindJobsMessage /> : <FilteredJobs jobs={jobs}/>} 

        </div>
    )
}


export default FindJobs