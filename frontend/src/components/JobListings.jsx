import { useState } from "react"
import Job from "./Job"

import SeeMore from "./SeeMore"
const JobListings = ( { jobs, user } ) => {    

    const [toggleSeeMore,setToggleSeeMore] = useState({status: null , job_id : null})
    
    return (
        <div className="job-listing-container container gap-3">
            {toggleSeeMore.status && <> <div className="see-more-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleSeeMore({status: false , job_id : null})}></div> <SeeMore user={user} toggleSeeMore={toggleSeeMore}/></>}
           

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