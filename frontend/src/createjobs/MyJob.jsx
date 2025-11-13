const MyJob = ( { job ,setToggleSeeMore} ) => {

    return(
        <div className="my-job-container" key={job.job_id}>
            <h3>{job.job_title}</h3>
            <h4>{job.job_desc}</h4>
            <h4>applicants : 0</h4> {/* change 0 with applicant list count and highligth it*/}
            <h4>date: </h4>{/* change date with job creation date*/}

            <button onClick={() => setToggleSeeMore({status:true , job_id : job.job_id})}>See More</button>
        </div>
    )
}


export default MyJob