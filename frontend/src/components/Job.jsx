import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

const Job = ({ job, user, setToggleSeeMore,savedJobs, appliedJobs , setToggleError}) => {

    const [cookies] = useCookies(['token']); //cookies
    const [isApplied, setIsApplied] = useState(null);//state for employee to see if they already applied for job
    const [isSaved, setIsSaved] = useState(null);//state for employee to see if they already saved for job
    
    const SAVE_URL = 'http://localhost:8080/saved'; //api for saved jobs
    const APPLY_URL = 'http://localhost:8080/applied'; //api for applied


    const handleSave = async() => {

        try{

            await axios.post(`${SAVE_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(setIsSaved(true), setToggleError(false)) //sends post request to server to save job in db
        
        }catch(err){

            console.log(err); //consoles error in console
            setToggleError(true); //toggles Error component if error occurs

        };
        
    };
    
    const handleApply = async() => {
        
        try{
        
            await axios.post(`${APPLY_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(setIsApplied(true) ,setToggleError(false))//sends post request to server to apply for job and save in database
        
        }catch(err){
            
            console.log(err); //consoles error in console
            setToggleError(true); //toggles Error component if error occurs

        };
        
    };


     useEffect(() => {
        
        const filterSavedJob = async() =>{

            const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == job.job_id);//fetches and filters job based on jobid and checks if it is already saved

            if(savedJobList.length > 0){//checks if job is saved

                if(savedJobList[0].job_id === job.job_id) setIsSaved(true); //sets state to true if job is saved and styles button if so

            };
            
            return; //if job is not saved returns nothing
        };

        const filterAppliedJob = async() =>{

            const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == job.job_id); //fetches and filters job based on jobid and checks if it is already applied

            if(appliedJobList.length > 0){

                if(appliedJobList[0].job_id === job.job_id) setIsApplied(true); //sets state t otrue if job is applied and styled button if so
                
            };

            return; //if job is not applied retursn nothing
        } 

        filterSavedJob(); 
        filterAppliedJob();//declaring functions

     },[savedJobs,appliedJobs]) //function run when this variables are changed



    return (
        <div className="job-container  border rounded-2 d-flex flex-column justify-content-between p-3 " key={job.job_id}>
            

                <div className="job-header">
                    <h4 className="text-break">{job.job_title}</h4>
                    <h6 className="text-break">{job.job_desc.length > 120 ? `${job.job_desc.slice(0,120)}...`  : job.job_desc}</h6>
                </div>

                <div className="job-footer">
                    <h6>Looking For : {job.job_employeeList}</h6>
                    <h6>Technologies : {job.job_technologies}</h6>
                </div>

                <div className="buttons row d-flex flex-column  gap-2  ">
                    {user.role !== 'Recruiter' && 
                    
                    <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                        {isApplied
                            ? <button className="btn btn-success opacity-50 w-50">Applied</button>
                            : <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>
                        }
                        {isSaved
                            ? <button className="btn opacity-75 border w-50 position-relative">Saved</button>
                            : <button className="btn border w-50" onClick={handleSave}>Save</button>
                        }
                    </div>}

                    <div className="buttons-footer col">
                        <button className="btn btn-primary w-100" onClick={() => setToggleSeeMore({ status: true, job_id: job.job_id })}>
                            See More...
                        </button>
                    </div>

                </div>

        </div>
    );
};//component renders job data and apply/save button , if user already applied/saved job it returns saved/applied button

export default Job; //exporting component