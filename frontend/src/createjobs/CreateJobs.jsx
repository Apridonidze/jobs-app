import { useState } from "react"
import CreateJobsInput from "./CreateJobsInput"
import NewJobsMessage from "../alerts/NewJobsMessage"

const CreateJobs = ( {} ) => {

    
    const [toggleCreateJobsInput,setToggleCreateJobsInput] = useState(false)
    const [toggleJobsMessage,setToggleJobsMessage] = useState(false)
    const [isJobsSuccessful,setIsJobsSuccessful] = useState(null)
    const [jobsMessage,setJobsMessage] = useState()

    return(
        <div className="create-jobs-container">
            <span>Create Job Opportunity</span> <button onClick={() => setToggleCreateJobsInput(!toggleCreateJobsInput)}>Add</button>

            {toggleCreateJobsInput && <> <div className="create-jobs-input-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleCreateJobsInput(false)}></div> <CreateJobsInput setIsJobsSuccessful={setIsJobsSuccessful} setToggleJobsMessage={setToggleJobsMessage} setJobsMessage={setJobsMessage}/> {toggleJobsMessage && <NewJobsMessage />} </> }

{/* add my posted jobs here */}

        </div>
    )
}


export default CreateJobs