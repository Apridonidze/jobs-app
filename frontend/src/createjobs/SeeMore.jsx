import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

import Error from "../alerts/Error";
import JobHolder from "./JobHolde"; //importing react component


const SeeMore = ( {toggleSeeMore, setToggleDelete} ) => {

    const [ cookies ] = useCookies(['token']); //cookies

    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'; //api url to fetch job list form server
    const PENDINGS_URL = 'http://localhost:8080/accept-decline/my-applicants'; //api url to fetch applicant list for jobs

    const [job, setJob] = useState(null); //state for jobs
    const [applicants,setApplicants] = useState(null); //state for applicants 
    const [toggleError, setToggleError] = useState(); //toggles error message 

    useEffect(() => {
        
        const fetchJob = async() => {

            try{
                await Promise.all([

                    axios.get(`${JOBS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}) //fetches data from server about job based on jobid
                    .then(resp => {setJob(resp.data[0]) ; setToggleError(false)}), //sets job data into setJob state

                    axios.get(`${PENDINGS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}) //fetcheds data from server about job applicants based on jobid
                    .then(resp => {setApplicants(resp.data) ; setToggleError(false)}) //sets applciant list into setApplicant state

                ]);

            }catch(err){

                console.log(err); //consoles error
                setToggleError(true); //toggles error component if error occurs

            };

        };
        
        fetchJob(); //declearing function

    },[]);//function toggles once component is rendered


    return(
        <div className="see-more-container position-fixed bg-white">

            {toggleError && <Error setToggleError={setToggleError}/>}

            {job && applicants && <JobHolder job={job} applicants={applicants} setToggleDelete={setToggleDelete}/>}

        </div>
    );
};

export default SeeMore; //exporting component