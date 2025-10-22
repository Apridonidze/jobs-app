import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import axios from "axios"
import NavBar from "../navbar/NavBar"

import CreateJobs from "../createjobs/CreateJobs"
import FindJobs from "../components/FindJobs"
import Footer from "../components/Foooter"
import JobListings from "../components/JobListings"
import ProfileMessage from "../alerts/ProfileMessage"

const Main = () => {

    const [toggleFindJobs, setFindJobs] = useState(false)
    const [toggleCreateJobs, setCreateJobs] = useState(false)
    const [toggleJobsListings, setToggleJobsListings] = useState(false)
    

    
    const MY_USER_API = 'http://localhost:8080/user/my-user' //move to .env
    const IS_PROFILE_FINISHED_URL = 'http://localhost:8080/is-profile-finished' //move to .env
    

    const [cookies] = useCookies(['token'])

    const [user,setUser] = useState(null)

    const [isProfileFinished , setIsProfileFinished] = useState(null)


    useEffect(() => {

        axios
        .get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => {
            const userData = resp.data.data[0]
            setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})
        })
        .catch(err => console.log(err))


        
        axios.get(IS_PROFILE_FINISHED_URL , {headers: {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => setIsProfileFinished(true))
        .catch(err => setIsProfileFinished(false))


    },[])


    //TODO : add database folder and add readme file for it 

    //if error reset cookies and navigate user to authentication page 

    //TODO (recruiter side): Add button to see who submited for your work , and add feature that accepts ,declines , ignoers employee

    //TODO (employee side): Add notification button that shows if you get hired or declined 
    //TODO (reqruiter side): Add notification button that shows who submitted for your job (with accoutn path) see this user and decline or accept him
    
    return(
        <div className="main-container container d-flex flex-column  justify-content-between min-vh-100 py-2">


            <NavBar user={user} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs} toggleJobsListings={toggleJobsListings} setToggleJobsListings={setToggleJobsListings}/>
            {isProfileFinished != null && !isProfileFinished && <ProfileMessage />}
           
            {toggleFindJobs && <FindJobs isProfileFinished={isProfileFinished}/>}
            {toggleCreateJobs && <CreateJobs />}
            {toggleJobsListings && <JobListings/>}

            <Footer />
        </div>
    )
}

//add titles to this page
export default Main