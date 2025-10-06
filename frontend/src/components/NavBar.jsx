import NavBarFooter from "./NavBarFooter"
import NavBarHeader from "./NavBarHeader"

const NavBar = ({ user }) => {

    return (
        <div className="nav-bar-container row">
            <NavBarHeader user={user} />
            <NavBarFooter user={user}/>
        </div>

      
    )
}


export default NavBar