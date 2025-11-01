import axios from 'axios'
import { useCookies } from 'react-cookie'

const AcceptDeclineApplicants = ( { applicant } ) => {

    const [ cookies ] = useCookies(['token'])

    const ACCEPT_DECLINE_APPLICANTS_URL = 'http://localhost:8080/accept-decline/accept-decline-employee' //move to .env

        const AcceptDeclineApplicants = async(e) => {
            e.preventDefault()


            try{
                await Promise.all([
                    axios.post(ACCEPT_DECLINE_APPLICANTS_URL , {applicant_id : applicant.user_id , status: e.target.value} , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => console.log(resp.data))
                ])
                
            }catch(err){
                console.log(err)
            }

        }


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