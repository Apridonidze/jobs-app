import Job from "./Job";//importing react component

const JobListings = ( { jobs, user , setToggleSeeMore, savedJobs, appliedJobs } ) => {

    return (
        <div className="job-listing-container d-flex flex-column my-3 container gap-3 min-vh-100">
          

            <div className="job-listing-header">
                
                <h1>Job Listing : </h1>

            </div>

             <div className="job-listing-body py-3 row gap-3 justify-content-start">
                
                {jobs.length < 1 ? <h1>No Jobs Posted Yet.</h1> : jobs.slice().reverse().map((job) => (
                    <Job job={job} user={user} setToggleSeeMore={setToggleSeeMore} savedJobs={savedJobs} appliedJobs={appliedJobs}/>
                ))}


            </div>
        </div>
    );
};//component returns all jobs from database . if there is no jobs it returns No Jobs Posted Yet text


export default JobListings;//exporting component