import NavBarFooter from "../navbar/NavBarFooter"
import NavBarHeader from "../navbar/NavBarHeader"

const NavBar = ({ setCreatePosts , setFindJobs ,setCreateJobs, user }) => {

    return (
        <div className="nav-bar-container row">
            {user && (<><NavBarHeader user={user} />  <NavBarFooter user={user} setCreatePosts={setCreatePosts} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs}/></>)}
        </div>

      
    )
}


export default NavBar