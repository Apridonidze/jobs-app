import { useState } from "react"
import CreateJobsInput from "./CreateJobsInput"

const CreateJobs = () => {

    const [toggleCreateJobsInput,setToggleCreateJobsInput] = useState(false)

    return(
        <div className="create-jobs-container ">
            <span>Create Job Opportunity</span> <button onClick={() => setToggleCreateJobsInput(!toggleCreateJobsInput)}>Add</button>

            {toggleCreateJobsInput && <CreateJobsInput />}

        </div>
    )
}


export default CreateJobs