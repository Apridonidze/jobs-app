import FindJobsMessage from "../alerts/FindJobsMessage"

const FindJobs = ( { isProfileFinished } ) => {
    
    //TODO (employee side): when jobs are displayed , that jobs should have button that redirect user to that job path where he can seee everyting in details 
    // TODO (employee side): this path should have button to submit for job

    return(
        <div className="create-jobs-container ">
            {isProfileFinished !==null && !isProfileFinished ? <FindJobsMessage /> : <h1>filtered jobs</h1>} 

        </div>
    )
}


export default FindJobs