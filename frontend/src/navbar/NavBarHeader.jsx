import { Link } from "react-router-dom"

const NavBarHeader = ( { user } ) => {
    return(
        <div className="nav-bar-header row">
            <div className="col"><Link to='/'>LOGO</Link></div> 
            <div className="col"><Link to='/my-account'>{user && user.name}</Link></div>
        </div>
    )
}


export default NavBarHeader