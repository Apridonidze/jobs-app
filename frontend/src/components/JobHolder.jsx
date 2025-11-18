import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

const JobHolder = ( { job , savedJobs ,appliedJobs } ) => {

    const [cookies] = useCookies(['token']); //coookies

    const [jobStatus, setJobStatus] = useState([]);//state for job status (as a recruiter : if employee is already accepted/declined , as a employee : if i haver already have been accepted/declined)
    const [isApplied , setIsApplied]  = useState(false); //checking if i (as an  employee) have already applied for job
    const [isSaved , setIsSaved]  = useState(false);//checking if i (as an  employee) have already saved job

    const SAVE_URL = 'http://localhost:8080/saved'; //api url to post saved job
    const APPLY_URL = 'http://localhost:8080/applied'; // api url to post applied job
    const JOB_STATUS_URL = 'http://localhost:8080/accept-decline'; //api url to get job status 


    const handleSave = async() => {
        
        try{

            await axios.post(`${SAVE_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(setIsSaved(true)); //sends post request to server to save job as saved job

        }catch(err){

            console.log(err); //consoles error
            
        };

    }; //function triggers  on save button

    
    const handleApply = async() => {
        
        try{
            
            await axios.post(`${APPLY_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(setIsApplied(true)) //sends posts requests to server to save job as applied job
            
        }catch(err){

            console.log(err); //consoles error

        };
    };  //function tirggers on apply button

   
    useEffect(() => {
        
        const filterSavedJob = async() =>{

            const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == job.job_id); //gets savedjobs
        
            if(savedJobList.length > 0){//if savedjobs.length > 0 then if statemnent executes

                if(savedJobList[0].job_id === job.job_id) setIsSaved(true); //checks savedjob id === job.job_id . if its true then it sets state to true
            };
            
            return ;
        }; //filteeres all job lists based on current.job_id and checks if it  is saved

        const filterAppliedJob = async() =>{
            
            const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == job.job_id); //gets applied jobs
            
            if(appliedJobList.length > 0){//if applied jobs.length > 0 then if statemnent executes

                if(appliedJobList[0].job_id === job.job_id) setIsApplied(true); //checks appliedjob.id === job.job_id , if its true then it sets to tstate true
            };
            
            return;
        } ;//filteeres all job lists based on current.job_id and checks if it  is applied

        const fetchJobStatus = async () => {
           
            try{
                await axios.get(`${JOB_STATUS_URL}/${job.job_id}` , {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(res => {console.log(res) ; setJobStatus(res.data)}); //sends get request to get job status
            
            }catch(err){
                console.log(err); //consoles.error
            };
           
        }; //fetches job status from server to checks if user has already applied or saved job

        filterSavedJob();
        filterAppliedJob();
        fetchJobStatus(); //declearing functions

     },[savedJobs,appliedJobs]); //functions executes once savedJobs and AppliedJobs are changed or mounted



    return (
    <div className="card h-100 d-flex flex-column" >

        <div className="card-body flex-grow-1">

            <div className="job-info">
                <h1 className="text-break fs-4">{job.job_title.length > 15 ? `${job.job_title.slice(0,15)}...` : job.job_title}</h1>
                <h2 className="text-break fs-6">{job.job_desc.length > 15 ? `${job.job_desc.slice(0,15)}...` : job.job_desc}</h2>
                <h3 className="text-break fs-6">Looking For : {job.job_employeeList}</h3>
                <h3 className="text-break fs-6">Technologies : {job.job_technologies}</h3>
                <h3 className="text-break fs-6">Speaking Language : {job.job_languages}</h3>
            </div>


        </div>

        <div className="job-status px-3 my-2">
                <h4 className="fs-6">Job Status : {jobStatus.status === 'true' ? <b className="text-success">Accepted</b> : <b className="text-danger">Declined</b> }</h4> 
        </div>

        <div className="p-2 mt-auto">

            <div className="job-buttons d-flex w-100 justify-content-between gap-2">

                {isApplied ? (
                    <button className="btn btn-success opacity-50 w-50">Applied</button>
                ) : (
                    <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>
                )}

                {isSaved ? (
                    <button className="btn opacity-75 border w-50">Saved</button>
                ) : (
                    <button className="btn border w-50" onClick={handleSave}>Saved</button>
                )}
                
            </div>

        </div>

    </div>
    );
};

export default JobHolder;//exporting component