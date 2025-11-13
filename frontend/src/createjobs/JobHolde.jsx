import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Delete from './Delete'
const JobHolder = ( { job , setToggleDelete } ) => {

    const [cookies] = useCookies(['token'])
    const [applicants,setApplicants] = useState(null)
    const [status, setStatus] = useState(null)
    const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants'
    const ACCEPT_DECLINE_URL = 'http://localhost:8080/accept-decline/accept-decline-employee'

    useEffect(() => {
        const fetchApplicants = async() => {
                await Promise.all([
                    axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(res => {console.log(res);setApplicants(res.data)}),
                ])

        }

        fetchApplicants()
    },[])
    
//:jobId/:applicantId/:status

    const sendStatus =  async(e) => {
        await axios.post(`${ACCEPT_DECLINE_URL}/${job.job_id}/${e.userId}/${e.status}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => { console.log(resp);if(e.status === true )setStatus(true); else setStatus(false)})
    }
    
    console.log(applicants && applicants[0].status[0].status)
    return(
        <div className="job-holder-container position-fixed bg-white w-75 mx-5" key={job.job_id}>
            <div className="job-info">
                    
                <h1>{job.job_title}</h1>
                <h2>{job.job_desc}</h2>
                <h3>{job.job_employeeList}</h3>
                <h3>{job.job_technologies}</h3>
                <h3>{job.job_languages}</h3>

            </div>

            <div className="job-applicants" >
                {!applicants ? <h1>Loading...</h1> : applicants.length < 1 ? <h1>No Applicants Yet.</h1> : <><h3>Applicants For This Job : </h3> <div className="applicants-container d d-flex flex-column overflow-auto" style={{maxHeight: '400px'}}>
                    
                    {applicants.map(user => (<>
                    <Link to={`/user-account/${user.applicant.user_id}`}>{`${user.applicant.user_name } ${user.applicant.user_surname}`}</Link>
                    <h4>user technologies: {user.technologies.length < 1 ? <span>No Technologies</span> : user.technologies[0].user_technologies.map(tech => tech)}</h4>
                    <h4>user role: {user.roles.length < 1 ? <span>No Technologies</span> : user.roles[0].user_roles.map(role => role)}</h4>
                    
                    <h4>status : {user.status.length > 0 ? user.status[0].status == 'true' ? <button>accepted</button>  : <button>declined</button>: <><button>AcceptOrDecline</button></>}</h4>

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