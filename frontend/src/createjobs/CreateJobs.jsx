import { useState } from "react"
import CreateJobsInput from "./CreateJobsInput"

const CreateJobs = () => {

    const [toggleCreateJobsInput,setToggleCreateJobsInput] = useState(false)

    return(
        <div className="create-jobs-container">
            <span>Create Job Opportunity</span> <button onClick={() => setToggleCreateJobsInput(!toggleCreateJobsInput)}>Add</button>

            {toggleCreateJobsInput && <> <div className="create-jobs-input-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleCreateJobsInput(false)}></div> <CreateJobsInput /></>}

        </div>
    )
}


export default CreateJobs