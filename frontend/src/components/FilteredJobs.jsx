import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NoJobFound from "./NoJobFound";
import FilteredJob from "./FilteredJob";

const FilteredJobs = ({ jobs ,savedJobs,appliedJobs , setToggleSeeMore}) => {

  const [cookies] = useCookies(["token"]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userTechnologies, setUserTechnologies] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const MY_USER_ROLE_URL = "http://localhost:8080/roles/my-roles";
      const MY_USER_TECH_URL = "http://localhost:8080/technologies/user-technologies";

      try {
        
        await Promise.all([
          axios.get(MY_USER_TECH_URL, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(resp => {
            if(resp.status === 204) setUserTechnologies([])
            else setUserTechnologies(resp.data)
          }),
          axios.get(MY_USER_ROLE_URL, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(resp => {
            if(resp.status === 204) setUserRoles([])
            else setUserRoles([resp.data[0].user_roles])
          })
        ]);

      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [cookies.token]);

  useEffect(() => {
    if (userTechnologies.length > 0 && userRoles.length > 0 && jobs.length > 0) {
      const filtered = jobs.filter(job => 
        job.job_technologies.some(tech => tech.includes(tech))
         &&
          job.job_employeeList.some(role => role.includes(role))
      );
      console.log(filtered)
      setFilteredJobs(filtered);
    }
  }, [userTechnologies, userRoles, jobs]);


  return (
    <div className="filtered-jobs-container container py-3 row gap-3 justify-content-start">
      <h1>Jobs For You:</h1>

      {filteredJobs.length < 1  ? <NoJobFound /> : filteredJobs.map((filteredJob,filteredJobId) => (<FilteredJob filteredJob={filteredJob} key={filteredJobId} setToggleSeeMore={setToggleSeeMore} appliedJobs={appliedJobs} savedJobs={savedJobs}/>))}

    </div>
  );
};

export default FilteredJobs;
