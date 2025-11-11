import { Link } from "react-router-dom"

const JobHolder = ( { job, applicants,setToggleDelete } ) => {


    return(
        <div className="job-holder-container position-fixed bg-white" key={job.job_id}>
            <div className="job-info">
                    
                <h1>{job.job_title}</h1>
                <h2>{job.job_desc}</h2>
                <h3>{job.job_employeeList}</h3>
                <h3>{job.job_technologies}</h3>
                <h3>{job.job_languages}</h3>

            </div>

            <div className="job-applicants">
                <h3>Applicants For This Job : </h3>
                <span></span>
                <span>{applicants.message}</span>
                <Link to={`/user-account/${applicants.user_id}`} ><h4 key={applicants.user_id}>{applicants.user_name}</h4></Link>

            </div>

            <div className="job-buttons">
                <button onClick={() => setToggleDelete({status: true, job_id : job.job_id})}>Delete Job Offer</button>
            </div>


        </div>
    )
}


export default JobHolder