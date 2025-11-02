const MyJob = ( { key ,jobId ,job ,setToggleSeeMore} ) => {

    return(
        <div className="my-job-container" key={key}>
            <h3>{job.job_title}</h3>
            <h4>{job.job_desc}</h4>
            <button onClick={() => setToggleSeeMore({status:true , job_id : job.job_id})}>See More</button>
        </div>
    )
}


export default MyJob