import { Link } from "react-router-dom"; //importing react library for navigation

const Applicant = ( { applicant } ) => {
    return(
        <div className="applicant-container d d-flex">
            
            <h4>Applicants:</h4>
            <Link to={`/user-account/${applicant.user_id}`} ><h4 key={applicant.user_id}>{applicant.user_name}</h4></Link>

        </div>
    );
};//allows users to visit other users page with link

export default Applicant; //exporting component