const Applicant = ( { applicant } ) => {
    return(
        <div className="applicant-container d d-flex">
            
            <h4>Applicants:</h4>
            <h4 key={applicant.user_id}>{applicant.user_name}</h4>
        </div>
    )
}

export default Applicant