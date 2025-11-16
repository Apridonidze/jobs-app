import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useState,useEffect } from "react"; //importing react hooks

const FilteredJob = ( { filteredJob , filteredJobId , key , setToggleSeeMore , savedJobs ,appliedJobs, setToggleError } ) => {
    
    const [cookies] = useCookies(['token']);//cookies
    
    const SAVE_URL = 'http://localhost:8080/saved'; //api url to save job
    const APPLY_URL = 'http://localhost:8080/applied'; //api url to apply for job

    const [isApplied , setIsApplied] = useState(); 
    const [isSaved , setIsSaved] = useState();//states to toggle buttons based on if employee has applied /saved job

    const handleApply = async(e) => {

        
        e.preventDefault();//preventing realoading when function triggers

         try{

            await axios.post(`${APPLY_URL}/${filteredJob.job_id}`, {}  , {headers:  {Authorization : `Bearer ${cookies.token}`}})
            .then(setIsApplied(true) , setToggleError(false)); //posting job to server to save this job as an applied job in db

        }catch(err){
            console.log(err); //consoles error
            setToggleError(true) //toggles error component when error occurs
        };

    };

    const handleSave = async(e) => {

        
        e.preventDefault(); //prevents reload when function triggers

         try{

            await axios.post(`${SAVE_URL}/${filteredJob.job_id}`, {} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
            .then(setIsSaved(true) , setToggleError(false)); //posting job to server to save this jos as a saved job in db
        

        }catch(err){
            console.log(err); //consoles error
            setToggleError(true); //toggles error component when error occurs
        };

    };

     useEffect(() => {
            
        const filterSavedJob = async() => {
                
            const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == filteredJob.job_id); //gets saved jobs from main component and filters it based on jobid
                
            if(savedJobList.length > 0){//if we get saved job then it executes if statemnet
        
                if(savedJobList[0].job_id === filteredJob.job_id) setIsSaved(true); //checks if savedjob job.id === current.job_id and then set state to true to let employee know they saved this job already
                
                };
            return ; //else if we get no saved job function does nothing

            };
    
        const filterAppliedJob = async() =>{
            
            const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == filteredJob.job_id);//gets applied jobs from main component and filters it based on jobid
            
            if(appliedJobList.length > 0){//if we get applied job then function executes if satetement
    
                if(appliedJobList[0].job_id === filteredJob.job_id) setIsApplied(true); //checks if appliedJob.job.id === current.job_id and then set state to true to let employee know they already applied this job already
                
            };

            return ; //else if we get no applied job function does nothing 
            } ;
    
        filterSavedJob();
        filterAppliedJob(); //declearing functions
    
        },[savedJobs,appliedJobs]);//this function mounts when savedJobs and AppliedJobs values are changed


    return (
        <div className="filtered-job-container col-5 border border-1 d-flex flex-column  justify-content-between py-2"  key={filteredJobId}>
            <div className="filtered-job-header">
            
                <h4 className="text-break">{filteredJob.job_title}</h4>
                <h6 className="text-break">{filteredJob.job_desc.length > 160 ? `${filteredJob.job_desc.slice(0,160)}...` : filteredJob.job_desc}</h6>
            
            </div>
            
            <div className="filtered-job-footer">
                
                <h6>Looking For : {filteredJob.job_employeeList}</h6>
                <h6>Technologies : {filteredJob.job_technologies}</h6>
            
            </div>

           <div className="buttons row d d-flex flex-column gap-2">
                <div className="buttons-header d d-flex gap-2 col">
                    {isApplied
                        ? <button className="btn btn-success opacity-50 w-50">Applied</button>
                        : <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>
                    }
                    {isSaved
                        ? <button className="btn opacity-75 border w-50 position-relative">Saved</button>
                        : <button className="btn border w-50" onClick={handleSave}>Save</button>
                    }
                </div>
                <div className="buttons-footer col">
                    <button className="btn btn-primary w-100" onClick={() => setToggleSeeMore({status: true, job_id : filteredJob.job_id})}>See More...</button>
                </div>
           </div>
        </div>
    );
};

export default FilteredJob; //exporting component