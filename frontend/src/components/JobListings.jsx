import Job from "./Job"

const JobListings = ( { jobs } ) => {    

    return (
        <div className="job-listing-container container gap-3">
            <h1>Job Listing : </h1>
            <div className="job-listing container py-3 row gap-3 justify-content-start">
            {jobs.reverse().map((job,jobId) => (
                <Job job={job} key={jobId} jobId={jobId}/>
            ))}
            </div>
        </div>
    )
}


export default JobListings