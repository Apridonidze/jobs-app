import { useCookies } from "react-cookie"
import Job from "./Job"
import axios from "axios"
const JobListings = ( { jobs, user , setToggleSeeMore } ) => {

    return (
        <div className="job-listing-container container gap-3">
          

            <h1>Job Listing : </h1>

             <div className="job-listing container py-3 row gap-3 justify-content-start">
                
                {jobs.slice().reverse().map((job) => (
                    <Job job={job} user={user} setToggleSeeMore={setToggleSeeMore} />
                ))}

            </div>
        </div>
    )
}


export default JobListings