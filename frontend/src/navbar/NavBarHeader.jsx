import { Link } from "react-router-dom"; //importing react library for navigation

const NavBarHeader = ( { user } ) => {
    return(
        <div className="nav-bar-header d d-flex justify-content-between text-start py-2">
            
            <div className="header-start">

                <Link to='/' className="alert-link fs-4">JOBS APP</Link>

            </div>

            <div className="header-end">

                <Link to='/my-account' className="text-dark link-underline  link-underline-opacity-0">{user && user.name}</Link>

            </div>
        
        </div>
    );
};

export default NavBarHeader;//exporting component