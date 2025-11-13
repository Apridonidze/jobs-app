import { Link } from "react-router-dom"; //component for navigation

const AuthNavBar = () => {
    return(
        <div className="authentication-header container-fluid d-flex align-items-center py-4 border-bottom justify-content-between ">

            <div className="header-start">

                <Link to='/authentication' className="alert-link fs-4">JOBS APP</Link>

            </div>
                
            <div className="header-end d-flex gap-4">
                    
                <Link to='/sign' className="btn border rounded-2 py-2 px-4">Sign</Link>
                <Link to='/login' className="btn border rounded-2 py-2 px-4">Login</Link>
                
            </div>
        </div>
    )
}


export default AuthNavBar;