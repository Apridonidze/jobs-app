import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Delete from './Delete'
const JobHolder = ( { job , setToggleDelete } ) => {

    const [cookies] = useCookies(['token'])
    const [applicants,setApplicants] = useState(null)

    const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants'

    useEffect(() => {
        const fetchApplicants = async() => {
            await axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(res => setApplicants(res.data))
            
        }

        fetchApplicants()
    },[])

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
                {!applicants ? <h1>Loading...</h1> : applicants.length < 1 ? <h1>No Applicants Yet.</h1> : <><h3>Applicants For This Job : </h3> <div className="applicants-container d d-flex flex-column">
                    
                    {applicants.map(user => (<>
                    <Link to={`/user-account/${user.applicant.user_id}`}>{`${user.applicant.user_name } ${user.applicant.user_surname}`}</Link>
                    <h4>user technologies: {user.technologies.length < 1 ? <span>No Technologies</span> : user.technologies[0].user_technologies.map(tech => tech)}</h4>
                    <button>Accept</button>
                    <button>Decline</button>
                </>))}
                    
                    </div></>} 
            </div>

            <div className="job-buttons">
                <button onClick={() => setToggleDelete({status: true, job_id : job.job_id})}>Delete Job Offer</button>
            </div>


        </div>
    )
}


export default JobHolder