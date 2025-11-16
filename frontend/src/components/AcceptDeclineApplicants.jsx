import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'; //importing react libraries

import { useEffect, useState } from 'react'; //importing react hooks

const AcceptDeclineApplicants = ( { applicant, toggleAcceptDecline } ) => {

    const [ cookies ] = useCookies(['token']);//cookies
    const [status , setStatus] = useState(null);//state to set status for each user (accepted/declined)
    const [statusMessage, setStatusMessage] = useState(''); //status message after posting user status

    const ACCEPT_DECLINE_APPLICANTS_URL = 'http://localhost:8080/accept-decline/' //api url to post user status to db

        const AcceptDeclineApplicants = async(e) => {


            try{
                await Promise.all([
                    axios.post(ACCEPT_DECLINE_APPLICANTS_URL , {applicant_id : applicant.user_id , job_id : toggleAcceptDecline.job_id, status: e.target.value } , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {setStatusMessage(resp.data.message) , setStatus(resp.data.status) , console.log(resp.data)}),
                ])
                
            }catch(err){
                console.log(err)
            }

        }

        useEffect(() => {
            const FetchUserStatus = async () => {
                try{

                    await Promise.all([
                        axios.get(`http://localhost:8080/accept-decline/${applicant.user_id}/${toggleAcceptDecline.job_id}` ,{headers: {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {setStatusMessage(resp.data.message) , setStatus(resp.data.status) })
                    ])

                }catch(err){
                    console.log(err)
                }
            }

            FetchUserStatus()
        },[])

    return(
        <div className="accept-decline-applicants-container">

            <h1>Applicants for this job</h1>

           <div className="accept-decline-applicants-body d d-flex justify-content-between">

                <Link to={`/user-account/${applicant.user_id}`} ><h4 key={applicant.user_id}>{applicant.user_name}</h4></Link>


                {status == true ? <><div className="buttons-container">
                    <button onClick={(e) => AcceptDeclineApplicants(e)} value={true}>Accept</button>
                    <button onClick={(e) => AcceptDeclineApplicants(e)} value={false}>Decline</button>

                </div></> : <h4>{statusMessage}</h4>}

                

            </div> 
           
        </div>
    )
}


export default AcceptDeclineApplicants