import { useEffect, useRef, useState } from "react"

import CreateJobsInput from "./CreateJobsInput"
import NewJobsMessage from "../alerts/NewJobsMessage"
import MyJobs from "./MyJobs"
import { useCookies } from "react-cookie"
import axios from "axios"

const CreateJobs = ( { setToggleSeeMore } ) => {

    const SubmitBtnRef = useRef(null)


    
    const [toggleCreateJobsInput,setToggleCreateJobsInput] = useState(null)
    const [toggleJobsMessage,setToggleJobsMessage] = useState(null)
    const [isJobsSuccessful,setIsJobsSuccessful] = useState(null)
    const [jobsMessage,setJobsMessage] = useState('')

    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    const [cookies] = useCookies(['token'])

    const [yourJobs,setYourJobs] = useState([])

    useEffect(() => {

        try{
             axios.get(JOBS_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => {setYourJobs(resp.data.jobs)})

        }catch(err){
            console.log(err)
        }

    },[])//make promise in try block 


    return(
        <div className="create-jobs-container">


            <span>Create Job Opportunity</span> <button onClick={() => setToggleCreateJobsInput(!toggleCreateJobsInput)}>Add</button>

            {toggleCreateJobsInput && <> <div className="create-jobs-input-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleCreateJobsInput(false)}></div> <CreateJobsInput SubmitBtnRef={SubmitBtnRef} setIsJobsSuccessful={setIsJobsSuccessful} setToggleJobsMessage={setToggleJobsMessage} setJobsMessage={setJobsMessage}/> {toggleJobsMessage && <NewJobsMessage  isJobsSuccessful={isJobsSuccessful} jobsMessage={jobsMessage} setToggleJobsMessage={setToggleJobsMessage} setToggleCreateJobsInput={setToggleCreateJobsInput} SubmitBtnRef={SubmitBtnRef}/>} </> }
            
            <MyJobs yourJobs={yourJobs} setToggleSeeMore={setToggleSeeMore}/>

        </div>
    )
}


export default CreateJobs