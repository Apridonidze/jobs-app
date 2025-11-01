const AcceptDeclineApplicants = ( { applicant } ) => {

        const AcceptDeclineApplicants = (e) => {
            e.preventDefault()

            console.log(e.target.value)

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