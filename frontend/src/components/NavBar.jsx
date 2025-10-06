import NavBarFooter from "./NavBarFooter"
import NavBarHeader from "./NavBarHeader"

const NavBar = ({ setToggleComponents, user }) => {

    return (
        <div className="nav-bar-container row">
            {user && (<><NavBarHeader user={user} />  <NavBarFooter user={user} setToggleComponents={setToggleComponents}/></>)}
        </div>

      
    )
}


export default NavBar