import { useState } from "react";
import Error from "../alerts/Error";
import Job from "./Job";//importing react component

const JobListings = ( { jobs, user , setToggleSeeMore, savedJobs, appliedJobs } ) => {

    const [toggleError,setToggleError] = useState(false)

    return (
        <div className="job-listing-container container my-3 d-flex flex-column gap-2">
          

            <div className="job-listing-header">
                
                <h1>Job Listing : </h1>

            </div>

             <div className="job-listing-body row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                
                {jobs.length < 1 ? <h1>No Jobs Posted Yet.</h1> : jobs.slice().reverse().map((job) => (
                    <Job job={job} user={user} setToggleSeeMore={setToggleSeeMore} savedJobs={savedJobs} appliedJobs={appliedJobs} setToggleError={setToggleError}/>
                ))}


            </div>

            {toggleError && <Error setToggleError={setToggleError} />}

        </div>
    );
};//component returns all jobs from database . if there is no jobs it returns No Jobs Posted Yet text


export default JobListings;//exporting component