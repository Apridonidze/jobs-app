import { Link } from "react-router-dom"

const NavBarHeader = ( {  user } ) => {
    return(
        <div className="nav-bar-header row">
            <div className="col">Logo</div> {/**navigate user to main page when clicked */}
            <div className="col"><Link to='/my-account'>{user && user.name}</Link></div>
        </div>
    )
}


export default NavBarHeader