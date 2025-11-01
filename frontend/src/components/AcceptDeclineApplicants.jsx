import axios from 'axios'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

const AcceptDeclineApplicants = ( { applicant, toggleAcceptDecline } ) => {

    const [ cookies ] = useCookies(['token'])

    const ACCEPT_DECLINE_APPLICANTS_URL = 'http://localhost:8080/accept-decline/accept-decline-employee' //move to .env

        const AcceptDeclineApplicants = async(e) => {
            e.preventDefault()


            try{
                await Promise.all([
                    axios.post(ACCEPT_DECLINE_APPLICANTS_URL , {applicant_id : applicant.user_id , job_id : toggleAcceptDecline.job_id, status: e.target.value} , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => console.log(resp.data)),
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
                    .then(resp => console.log(resp))
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

           <div className="acceot-decline-applicants-body d d-flex justify-content-between">

                 <h4 key={applicant.user_id}>{applicant.user_name}</h4>

                <div className="buttons-container">
                    <button onClick={(e) => AcceptDeclineApplicants(e)} value={true}>Accept</button>
                    <button onClick={(e) => AcceptDeclineApplicants(e)} value={false}>Decline</button>
                </div>

            </div> 
           
        </div>
    )
}


export default AcceptDeclineApplicants