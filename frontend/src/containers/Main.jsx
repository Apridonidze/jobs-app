import { useCookies } from "react-cookie"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import NavBar from "../navbar/NavBar"
import '../main.css'

import CreateJobs from "../createjobs/CreateJobs"
import FindJobs from "../components/FindJobs"
import Footer from "../components/Foooter"
import JobListings from "../components/JobListings"
import ProfileMessage from "../alerts/ProfileMessage"
import Saved from "../components/Saved"
import Applied from "../components/Applied"
import Pendings from "../components/Pendings"
import SeeMore from "../components/SeeMore"
import JobHolder from "../createjobs/JobHolde"
import Delete from "../createjobs/Delete"
import Error from "../alerts/Error"


const Main = () => {

    const [cookies] = useCookies(['token'])
    const [toggleFindJobs, setFindJobs] = useState(null)
    const [toggleCreateJobs, setCreateJobs] = useState(null)
    const [toggleJobsListings, setToggleJobsListings] = useState(null)
    const [toggleSaved,setToggleSaved] = useState(null)
    const [toggleApplied,setToggleApplied] = useState(null)
    const [togglePending,setTogglePending] = useState(null)
    const [toggleError , setToggleError] = useState(false)


    const MY_USER_API = 'http://localhost:8080/user/my-user' //move to .env
    const IS_PROFILE_FINISHED_URL = 'http://localhost:8080/is-profile-finished' //move to .env
    const JOBS_URL = 'http://localhost:8080/jobs/job-listing' ////move to .env
    const IS_SAVED_URL = 'http://localhost:8080/saved/my-saved-jobs';
    const IS_APPLIED_URL = 'http://localhost:8080/applied/my-applied-jobs'

    const [toggleSeeMore , setToggleSeeMore] = useState({status: null , job_id : null})
    const [job,setJob] = useState(null)


    const [user,setUser] = useState(null)
    const [jobs,setJobs] = useState([])
    const [savedJobs,setSavedJobs] = useState([])
    const [appliedJobs,setAppliedJobs] = useState([])
    

    const [isProfileFinished , setIsProfileFinished] = useState(false)

    const [toggleDelete, setToggleDelete] = useState(null)

    useEffect(() => {

        const fetchData = async() => {

            try{
                await Promise.all([
                    axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {const userData = resp.data  ; setUser({id : userData.user_id , role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})}),
                    axios.get(IS_PROFILE_FINISHED_URL , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(resp => setIsProfileFinished(resp.data)),
                    axios.get(JOBS_URL, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => setJobs(resp.data.jobs) ),
                    axios.get(IS_SAVED_URL , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {if(resp.status === 204) setSavedJobs([]) ;else setSavedJobs(resp.data)}),
                    axios.get(IS_APPLIED_URL, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {if(resp.status === 204) setAppliedJobs([]) ; else setAppliedJobs(resp.data)}),
                ])
       
            }catch(err){
                
            }

        }

       
        fetchData()
        
    },[cookies.token])



   
    useEffect(() => {

        const fetchSeeMore = () => {

            if(toggleSeeMore?.job_id) setJob(jobs.filter(job => job.job_id === toggleSeeMore.job_id)[0])
            
        } 


        fetchSeeMore()
        

    },[toggleSeeMore])

    
    return(
        <div className="main-container container d-flex flex-column  justify-content-between min-vh-100 py-2">


            <NavBar user={user} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs} toggleJobsListings={toggleJobsListings} setToggleJobsListings={setToggleJobsListings} setToggleSaved={setToggleSaved} setToggleApplied={setToggleApplied} setTogglePending={setTogglePending}/>
            
            {isProfileFinished != null && !isProfileFinished && <ProfileMessage />}
          
            {toggleSeeMore.status && user && job  && <> <div className="see-more-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0"  onClick={() => {setToggleSeeMore({status: null , job_id : null}) }}></div> {user.role === 'Recruiter' && user.id === job.user_id ? <JobHolder job={job} setToggleDelete={setToggleDelete}/> : <SeeMore user={user} toggleSeeMore={toggleSeeMore} job={job} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}</>}
            {toggleDelete?.status && <><div className="delete-background bg-dark position-fixed d-flex flex-column w-100 h-100 top-0 start-0 opacity-75" onClick={() => setToggleDelete({status:false , job_id : false})}></div><Delete toggleDelete={toggleDelete} setToggleDelete={setToggleDelete}/> </>}
            {!toggleError && <Error setToggleError={setToggleError}/>}
           
            {toggleFindJobs && <FindJobs isProfileFinished={isProfileFinished} jobs={jobs}/>}
            {toggleCreateJobs && <CreateJobs setToggleSeeMore={setToggleSeeMore}/>}
            {toggleJobsListings && <JobListings jobs={jobs} user={user} toggleSeeMore={toggleSeeMore}  setToggleSeeMore={setToggleSeeMore}  savedJobs={savedJobs} appliedJobs={appliedJobs}/> }
            {toggleSaved && <Saved user={user} jobs={savedJobs} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}
            {toggleApplied && <Applied user={user} jobs={appliedJobs} savedJobs={savedJobs} appliedJobs={appliedJobs}/>}
            {togglePending && <Pendings />}

            <Footer />
        </div>
    )
}

//add titles to this page
export default Main