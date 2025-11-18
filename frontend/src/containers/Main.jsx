import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

import '../main.css'; //importing css file

import NavBar from "../navbar/NavBar";
import CreateJobs from "../createjobs/CreateJobs";
import FindJobs from "../components/FindJobs";
import Footer from "../components/Foooter";
import JobListings from "../components/JobListings";
import ProfileMessage from "../alerts/ProfileMessage";
import Saved from "../components/Saved";
import Applied from "../components/Applied";
import SeeMore from "../components/SeeMore";
import JobHolder from "../createjobs/JobHolde";
import Delete from "../createjobs/Delete";
import Error from "../alerts/Error"; //importing react components


const Main = () => {

    const [ cookies ] = useCookies(['token']); //cookies

    const [toggleFindJobs, setFindJobs] = useState(null); //toggles FindJob compononent
    const [toggleCreateJobs, setCreateJobs] = useState(null); //toggles Create Job Component
    const [toggleJobsListings, setToggleJobsListings] = useState(null); //toggles JobListing component
    const [toggleSaved,setToggleSaved] = useState(null); //toggles Saved component
    const [toggleApplied,setToggleApplied] = useState(null); //toggles Applied component
    const [toggleError , setToggleError] = useState(false); // toggles Error message
    const [toggleSeeMore , setToggleSeeMore] = useState({status: null , job_id : null}) ; //toggles SeeMore component
    const [toggleDelete, setToggleDelete] = useState(null); //toggles Delete component

    const [isProfileFinished , setIsProfileFinished] = useState(false); //toggles ProfileMessage

    const MY_USER_API = 'http://localhost:8080/user/my-user'; //api url to fetch users data
    const IS_PROFILE_FINISHED_URL = 'http://localhost:8080/is-profile-finished' ;//api url to fetch if user has finished their profile
    const JOBS_URL = 'http://localhost:8080/jobs/job-listing'; //api url to fetch jobs 
    const IS_SAVED_URL = 'http://localhost:8080/saved/my-saved-jobs'; //api url to fetch users saved job
    const IS_APPLIED_URL = 'http://localhost:8080/applied/my-applied-jobs'; //api url to fetch users apllied jobs

    const [user,setUser] = useState(null); //state for user data
    const [jobs,setJobs] = useState([]); //state for jobs
    const [job,setJob] = useState(null); //state for job 
    const [savedJobs,setSavedJobs] = useState([]); //state for saved jobs
    const [appliedJobs,setAppliedJobs] = useState([]); //state for applied jkobs
    

    useEffect(() => {

        const fetchData = async() => {

            try{
                await Promise.all([
                    axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {const userData = resp.data  ; setUser({id : userData.user_id , role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})}),
                    axios.get(IS_PROFILE_FINISHED_URL , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(resp => setIsProfileFinished(resp.data)),
                    axios.get(JOBS_URL, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => setJobs(resp.data.jobs) ),
                    axios.get(IS_SAVED_URL , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {if(resp.status === 204) setSavedJobs([]) ;else setSavedJobs(resp.data)}),
                    axios.get(IS_APPLIED_URL, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {if(resp.status === 204) setAppliedJobs([]) ; else setAppliedJobs(resp.data)}),
                ]) ; //fetches data from server

                setToggleError(false) ; //untoggles error component
       
            }catch(err){
                console.log(err); //consoles error
                setToggleError(true); //toggles error component
            };
        };
       
        fetchData();//declearing function
        
    },[cookies.token]); //function triggers on this variables change



   
    useEffect(() => {

        const fetchSeeMore = () => {

            if(toggleSeeMore?.job_id) setJob(jobs.filter(job => job.job_id === toggleSeeMore.job_id)[0]); //filters job list to display one in SeeMore component
            
        };

        fetchSeeMore() ; //delearing function
        

    },[toggleSeeMore]) //function triggers on this variable cahnge

    
    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-between min-vh-100 py-2">


            <NavBar user={user} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs} toggleJobsListings={toggleJobsListings} setToggleJobsListings={setToggleJobsListings} setToggleSaved={setToggleSaved} setToggleApplied={setToggleApplied} />
            
            {isProfileFinished != null && !isProfileFinished && <ProfileMessage />}
          
            {toggleSeeMore.status && user && job  && <> <div className="see-more-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" style={{zIndex: 1998}}  onClick={() => {setToggleSeeMore({status: null , job_id : null}) }}></div> {user.role === 'Recruiter' && user.id === job.user_id ? <JobHolder job={job} setToggleDelete={setToggleDelete}/> : <SeeMore user={user} toggleSeeMore={toggleSeeMore} job={job} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}</>}
            {toggleDelete?.status && <><div className="delete-background bg-dark position-fixed d-flex flex-column w-100 h-100 top-0 start-0 opacity-75" onClick={() => setToggleDelete({status:false , job_id : false})}></div><Delete toggleDelete={toggleDelete} setToggleDelete={setToggleDelete}/> </>}
            {toggleError && <Error setToggleError={setToggleError}/>}
           
            {toggleFindJobs && <FindJobs isProfileFinished={isProfileFinished} setToggleSeeMore={setToggleSeeMore} jobs={jobs} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}
            {toggleCreateJobs && <CreateJobs setToggleSeeMore={setToggleSeeMore}/>}
            {toggleJobsListings && <JobListings jobs={jobs} user={user} toggleSeeMore={toggleSeeMore}  setToggleSeeMore={setToggleSeeMore}  savedJobs={savedJobs} appliedJobs={appliedJobs}/> }
            {toggleSaved && <Saved user={user} jobs={savedJobs} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}
            {toggleApplied && <Applied user={user} jobs={appliedJobs} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}
            

            <Footer />
        </div>
    );
};


document.title = 'Jobs App - Main'; //title for page

export default Main; //exporting component