import { Link } from "react-router-dom"

const NavBarHeader = ( { user } ) => {
    return(
        <div className="nav-bar-header d d-flex justify-content-between text-start">
            <div className="col w-25"><Link to='/'>LOGO</Link></div> 
            <div className="col w-25 text-end"><Link to='/my-account'>{user && user.name}</Link></div>
        </div>
    )
}


export default NavBarHeader