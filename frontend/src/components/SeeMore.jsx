import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useState, useEffect } from "react"; //importing react hooks

import '../main.css';//importing css file

const SeeMore = ({ user, job , savedJobs , appliedJobs  }) => { 

    const [cookies] = useCookies(['token']); //cookies
    const [isApplied, setIsApplied] = useState(null); //state for applied jobs
    const [isSaved, setIsSaved] = useState(null); //state for saved jobs

    const SAVE_URL = 'http://localhost:8080/saved'; //api url to save job in db
    const APPLY_URL = 'http://localhost:8080/applied'; //api url to apply for job in db
  
    const handleSave = async() => {
        
        try{
            await axios.post(`${SAVE_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(setIsSaved(true)); //posts saved job to server
        }catch(err){
            console.log(err); //consoles error 
        };
        
    };

    
    const handleApply = async() => {
        
        try{

            await axios.post(`${APPLY_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(setIsApplied(true)); //post apply job to server

        }catch(err){
            console.log(err); //consoles error
        };
    };



     useEffect(() => {
        
        const filterSavedJob = async() =>{

            const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == job.job_id); //filters savedjob list based on jobid

            if(savedJobList.length > 0){ //if we get savedjob then if statement executes

                if(savedJobList[0].job_id === job.job_id) setIsSaved(true); //if savedjob.job_id === job.job then state is change dto true
            };

            return ; //else function return nothing 
            
        };

        const filterAppliedJob = async() =>{

            const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == job.job_id);//filters applied list based on jobid
            
            if(appliedJobList.length > 0){ //if we get applyjob thne if statement executes

                if(appliedJobList[0].job_id === job.job_id) setIsApplied(true); //if applyjob.job_iod === job.job_id then state is changed to true
                    
            };

            return ;//else functio returns nothing

        };

        filterSavedJob();
        filterAppliedJob(); //declareing functions

     },[savedJobs,appliedJobs]); //functions run once these states are changed



    return (
        <div className="job-container col-5 border border-1 d-flex flex-column justify-content-between p-3 rounded-2 position-fixed bg-white"  key={job.job_id}>
            <div className="job-header overflow-y-auto">
                <h4 className="text-break">{job.job_title}</h4>
                <h6 className="text-break">{job.job_desc}</h6>
            </div>

            <div className="job-footer">
                <h6>Looking For : {job.job_employeeList}</h6>
                <h6>Technologies : {job.job_technologies}</h6>
            </div>

            <div className="buttons row d-flex flex-column gap-2">
                {user.role !== 'Recruiter' && <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                    {isApplied
                        ? <button className="btn btn-success opacity-50 w-50">Applied</button>
                        : <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>
                    }
                    {isSaved
                        ? <button className="btn opacity-75 border w-50 position-relative">Saved</button>
                        : <button className="btn border w-50" onClick={handleSave}>Save</button>
                    }
                </div>}

            </div>
        </div>
    );
};


export default SeeMore; //exporting component