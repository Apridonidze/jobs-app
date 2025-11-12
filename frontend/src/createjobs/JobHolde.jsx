import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
const JobHolder = ( { job  } ) => {

    const [cookies] = useCookies(['token'])
    const [applicants,setApplicants] = useState([])
    const [toggleDelete, setToggleDelete] = useState(null)

        const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants'

    useEffect(() => {
        const fetchApplicants = async() => {
            const res = await axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
            console.log(res)
            if(res.status === 204) {setApplicants([])}
            else {setApplicants(res.data)}
        }

        fetchApplicants()
    },[])

    console.log(applicants)

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
                {applicants !== null && applicants.length < 1 ? <h3>no appplicants</h3> : <h3>Applicants For This Job : {applicants.map(user => (<>
                    <Link to={`/user-account/${user.user_id}`}>{`${user.user_name } ${user.user_surname}`}</Link>
                    <button>Accept</button>
                    <button>Decline</button>
                </>))}</h3>} 
            </div>

            <div className="job-buttons">
                <button onClick={() => setToggleDelete({status: true, job_id : job.job_id})}>Delete Job Offer</button>
            </div>


        </div>
    )
}


export default JobHolder