const MyJob = ( { key ,jobId ,job} ) => {

    return(
        <div className="my-job-container" key={key}>
            <h3>{job.job_title}</h3>
            <h4>{job.job_desc}</h4>
            <button>See More</button>
        </div>
    )
}


export default MyJob