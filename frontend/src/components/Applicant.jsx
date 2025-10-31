const Applicant = ( { applicant } ) => {
    return(
        <div className="applicant-container">
            
            <span key={applicant.user_id}>{applicant.user_name}</span>

        </div>
    )
}

export default Applicant