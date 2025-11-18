import axios from "axios"; //importing react library
import { useCookies } from "react-cookie"; // importing react library for tokens
import { useEffect, useRef, useState } from "react"; //importing react hooks

import NewJobsMessage from "../alerts/NewJobsMessage";
import CreateJobsInput from "./CreateJobsInput";
import MyJobs from "./MyJobs"; 
import Error from "../alerts/Error"; //importing react components

const CreateJobs = ( { setToggleSeeMore } ) => {

    const SubmitBtnRef = useRef(null); //ref for job creation submit

    const [cookies] = useCookies(['token']); //cookies
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'; //fetch recruiters job api url

    const [toggleError,setToggleError] = useState(false); //state to toggle internal error message
    const [toggleCreateJobsInput,setToggleCreateJobsInput] = useState(null); //state to trigger CreateJobsInput coimponent
    const [toggleJobsMessage,setToggleJobsMessage] = useState(null); //state for new jobs message toggle
    const [isJobsSuccessful,setIsJobsSuccessful] = useState(null); //state for new jobs succcess
    const [jobsMessage,setJobsMessage] = useState(''); //state for new jobs message
    const [yourJobs,setYourJobs] = useState([]); //array state for jobs thaat are fetched form JOBS_URL api

    useEffect(() => {

        const fetchMyJobs = async() => {
            try{

                await axios.get(JOBS_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => {setYourJobs(resp.data.jobs)}); //waits for response from api and if success resp is saved in setYourJobs state

            }catch(err){
                setToggleError(true); //if there is internal error Error component toggles and console returnms error 
                console.log(err);
            };

        };

        fetchMyJobs(); //declaring function
        
    },[]); //fetchMyJobs Triggers only when component is mounted


    return(
        <div className="create-jobs-container container d-flex flex-column justifty-content-between min-vh-100 pt-5">


            <div className="create-jobs-header border-bottom pb-2 mb-4 d-flex justify-content-between ">
            
                <span className="fs-5">Create Job Opportunity</span> <button className="btn btn-primary" onClick={() => setToggleCreateJobsInput(!toggleCreateJobsInput)}>Add</button>
            
            </div>
            
                
            <MyJobs yourJobs={yourJobs} setToggleSeeMore={setToggleSeeMore} setToggleError={setToggleError}/>
            
            {toggleCreateJobsInput && <> <div className="create-jobs-input-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleCreateJobsInput(false)}></div> <CreateJobsInput SubmitBtnRef={SubmitBtnRef} setIsJobsSuccessful={setIsJobsSuccessful} setToggleJobsMessage={setToggleJobsMessage} setJobsMessage={setJobsMessage} setToggleError={setToggleError}/> {!toggleJobsMessage && <NewJobsMessage  isJobsSuccessful={isJobsSuccessful} jobsMessage={jobsMessage} setToggleJobsMessage={setToggleJobsMessage} setToggleCreateJobsInput={setToggleCreateJobsInput} SubmitBtnRef={SubmitBtnRef}/>} {toggleError && <Error setToggleError={setToggleError}/>} </> }
            {toggleError && <Error setToggleError={setToggleError}/>}

        </div>
    );
};


export default CreateJobs; //exporting componnt