import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const FilteredJobs = ({ jobs }) => {
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
          axios.get(MY_USER_TECH_URL, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(resp => setUserTechnologies(resp.data)),
          axios.get(MY_USER_ROLE_URL, { headers: { Authorization: `Bearer ${cookies.token}` } }).then(resp => setUserRoles(resp.data[0].user_roles))
        ]);

      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, [cookies.token]);

  useEffect(() => {
    if (userTechnologies.length > 0 && userRoles.length > 0 && jobs.length > 0) {
      const filtered = jobs.filter(
        job =>
          job.job_technologies.some(tech => userTechnologies.includes(tech)) &&
          job.job_employeeList.some(role => userRoles.includes(role))
      );
      setFilteredJobs(filtered);
    }
  }, [userTechnologies, userRoles, jobs]);

  return (
    <div className="filtered-jobs-container">
      <h1>Jobs For You:</h1>

      {filteredJobs.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <h2>{job.job_title}</h2>
            <p>Technologies: {job.job_technologies.join(", ")}</p>
            <p>Employee Roles: {job.job_employeeList.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FilteredJobs;
