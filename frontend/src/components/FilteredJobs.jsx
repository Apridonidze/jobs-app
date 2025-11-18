import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

import Error from '../alerts/Error';
import NoJobFound from "./NoJobFound";
import FilteredJob from "./FilteredJob"; //importing react comopnents


const FilteredJobs = ({ jobs ,savedJobs,appliedJobs , setToggleSeeMore}) => {
  
  const [cookies] = useCookies(["token"]); //cookies

  const [toggleError,setToggleError] = useState(false); //state to toggle Error.jsx component

  const [filteredJobs, setFilteredJobs] = useState([]); //state for filtered job
  const [userTechnologies, setUserTechnologies] = useState([]); ///state for user technologies that each job requires
  const [userRoles, setUserRoles] = useState([]);///state for user roles that each job requires
  
  const MY_USER_ROLE_URL = "http://localhost:8080/roles/my-roles"; //api to get user roles for specific job from server
  const MY_USER_TECH_URL = "http://localhost:8080/technologies/user-technologies"; //api to get user technologies for specific job from server

  useEffect(() => {
    
    const fetchUserData = async () => {

      try {
        
        await Promise.all([
          
          axios.get(MY_USER_TECH_URL, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(resp => { //fetches user technologies from server
            if(resp.status === 204) setUserTechnologies([]) , setToggleError(false); //if user does not have technologies choose it sets steate to empty array
            else setUserTechnologies(resp.data) , setToggleError(false); //else if user has technologies it sets in state 
          }),

          axios.get(MY_USER_ROLE_URL, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(resp => { //fetches user role from server
            if(resp.status === 204) setUserRoles([]) , setToggleError(false); //if user does not have role choosed it sets state to empty array
            else setUserRoles([resp.data[0].user_roles]) , setToggleError(false) ; //else if user has technologies it sets in state
          })

        ]);

      } catch (err) {

        console.log(err);//consoles error
        setToggleError(true); //toggles Errro.jsx component if error occurs

      }
    };

    fetchUserData();//declearing function

  }, [cookies.token]); //function triggers based on cookies.token (user cookies )


  useEffect(() => {
    
    if (userTechnologies.length > 0 && userRoles.length > 0 && jobs.length > 0) { //checks states if user has role and technolgoies and also checks jobs length that requires this role and techs

      const filtered = jobs.filter(job => 

        job.job_technologies.some(tech => tech.includes(userTechnologies))
        &&
        job.job_employeeList.some(role => role.includes(userRoles))

      ); //variable filetrs job (returns job that only have some parameters) . based on job requirements (role , technologies)
      
      setFilteredJobs(filtered); //sets filtered job in state that is later mapped
    }

  }, [userTechnologies, userRoles, jobs]); //function mounts once this variables change


  return (
    <div className="filtered-jobs-container">
      
      <div className="filtered-jobs-header mb-4">
        
        <h1>Jobs For You:</h1>

      </div>

      <div className="filtered-jobs-body row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        {toggleError && <Error setToggleError={setToggleError}/>}

        {filteredJobs.length < 1  ? <NoJobFound /> : filteredJobs.map((filteredJob,filteredJobId) => (<FilteredJob filteredJob={filteredJob} key={filteredJobId} setToggleSeeMore={setToggleSeeMore} appliedJobs={appliedJobs} savedJobs={savedJobs}/>))}

      </div>

    </div>
  );
};//component returns No Job found if user tech and role does not match any of the job requirements else if user matches some job requirements it returns FilteredJob.jsx component

export default FilteredJobs; //exporting component