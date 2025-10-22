import FindJobsMessage from "../alerts/FindJobsMessage"

const FindJobs = ( { isProfileFinished } ) => {

    //TODO (employee side): fetch jobs from database 
    //TODO (employee side): if user has finished his profile get his role (exp : web developer, testser ...etc) and technologies and display jobs suitable for him 
    //TODO (employee side): when jobs are displayed , that jobs should have button that redirect user to that job path where he can seee everyting in details 
    // TODO (employee side): this path should have button to submit for job

    return(
        <div className="create-jobs-container ">
            FindJobs

            {isProfileFinished !==null && !isProfileFinished ? <FindJobsMessage /> : <h1></h1>} 

        </div>
    )
}


export default FindJobs