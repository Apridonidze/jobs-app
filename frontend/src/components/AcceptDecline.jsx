import AcceptDeclineApplicants from "./AcceptDeclineApplicants"

const AccpetDecline = ( { toggleAcceptDecline,job ,applicants } ) => {

    return(
        <div className="accept-decline-container d d-flex flex-column position-fixed top-50 bg-white">
            

            <h3 key={toggleAcceptDecline.job_id}>{job.job_title}</h3>

            {applicants?.map(applicant => (
                <AcceptDeclineApplicants applicant={applicant}/>
            ))
            }
            
        </div>
    )
}

export default AccpetDecline