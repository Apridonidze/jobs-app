import { useState } from "react"
import Job from "./Job"

const JobListings = ( { jobs, user } ) => {    

    const [toggleSeeMore,setToggleSeeMore] = useState({status: null, job_id : null})
    

    return (
        <div className="job-listing-container container gap-3">

            <h1>Job Listing : </h1>


            <div className="job-listing container py-3 row gap-3 justify-content-start">
                
                {jobs.reverse().map((job) => (
                    <Job job={job} user={user} setToggleSeeMore={setToggleSeeMore}/>
                ))}

            </div>
        </div>
    )
}


export default JobListings