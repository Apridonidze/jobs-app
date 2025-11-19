import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom"; //importing react libraries

import { useState, useEffect } from "react"; //importing react hooks


const JobHolder = ( { job , setToggleDelete } ) => {

    const [cookies] = useCookies(['token']);//cookies
    const [applicants,setApplicants] = useState(null); //state for applicant lists
    const [status, setStatus] = useState(null); //state for applicants job statis(accepted || declined)

    const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants'; //api url to fetech applicant list
    const ACCEPT_DECLINE_URL = 'http://localhost:8080/accept-decline/accept-decline-employee'; //api url to fetch applicants status

    useEffect(() => {
        const fetchApplicants = async() => {
               try{
                    axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(res => {console.log(res);setApplicants(res.data)})//fetch applicants based on jobid
                
               }catch(err){

                    console.log(err) //console.logs error

               };
        };

        fetchApplicants(); //decalres function

    },[]);//function toggles when component is rendered
    

    const sendStatus =  async(e) => {
        
        try{

            await axios.post(`${ACCEPT_DECLINE_URL}/${job.job_id}/${e.userId}/${e.status}` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => { console.log(resp);if(e.status === true )setStatus(true); else setStatus(false)}) //sends status based on button recruiter clicked
        
        }catch(err){

            console.log(err) //consoes error in console

        }
    
    }; //toggles when accept or decline button is pressed by recruiter

    
    return(
        <div className="job-holder-container container py-2 px-3 position-fixed bg-white  d-flex flex-column justify-content-between gap-3 rounded-2 overflow-y-auto" style={{zIndex : 5000}}  key={job.job_id}>
            <div className="job-info ">
                    
                <h1 className="text-break">{job.job_title}</h1>
                <h2 className="text-break">{job.job_desc}</h2>
                <h3 className="text-break">Employee Roles :{job.job_employeeList}</h3>
                <h3 className="text-break">Employee Technologies :{job.job_technologies}</h3>
                <h3 className="text-break">Employee Speaking Language : {job.job_languages}</h3>

            </div>

            <div className="job-applicants " style={{height : '25vh'}} >
                {!applicants ? <h1>Loading...</h1> : applicants.length < 1 ? <h1>No Applicants Yet.</h1> : 
                
                <><h3 className="">Applicants For This Job : </h3> <div className="applicants-container row row-cols-1 row-cols-sm-2 overflow-y-auto g-3 mt-1" style={{maxHeight: '300px'}} >
                    
                    {applicants.map(user => (
                        <div className="applicant-container w-50 border col rounded-2 my-1">

                            
                            <Link className="fs-5" to={`/user-account/${user.applicant.user_id}`}>{`${user.applicant.user_name } ${user.applicant.user_surname}`}</Link>
                            <h4 className="d-flex flex-wrap g-3">User Technologies: {user.technologies.length < 1 ? <span className="border p-2 rounded-2 bg-danger text-white fs-6">No Technologies</span> : user.technologies[0].user_technologies.map((tech , techId) => <span key={techId} className="border p-2 rounded-2 bg-success text-white fs-6" >{tech}</span>)}</h4>
                            <h4 className="d-flex flex-wrap g-3">User Roles: {user.roles.length < 1 ? <span className="border p-2 rounded-2 bg-danger text-white fs-6">No Roles</span> : user.roles[0].user_roles.map((role, roleId) =>  <span key={roleId} className="border p-2 rounded-2 bg-success text-white fs-6" >{role}</span>)}</h4>
                            
                            
                            <div className="applicant-status row">
                                <h4>status : {user.status.length > 0 ? user.status[0].status == 'true' ? 
                            
                                <div ><button className="btn btn-success">Accepted</button><button className="btn btn-danger opacity-50">Decline</button></div>  
                                
                                : <div><button className="btn btn-success opacity-50">Accept</button><button className="btn btn-danger">Declined</button></div>
                                
                                : <><><button className="btn btn-success" onClick={() => sendStatus({userId : user.applicant.user_id , status : true})}>Accept</button><button className="btn btn-danger"  onClick={() => sendStatus({userId : user.applicant.user_id , status : false})}>Decline</button></></>}</h4>

                            </div>
                        </div>
                    ))}
                    

                    </div></>} 

                    <div className="job-buttons " style={{height: '60px'}} >
                        <button className="btn btn-danger w-100 my-4" onClick={() => setToggleDelete({status: true, job_id : job.job_id})}>Delete Job Offer</button>
                    </div>

            </div>

             

        </div>
    );
};


export default JobHolder; //exporting component