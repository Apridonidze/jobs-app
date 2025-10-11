import NavBarFooter from "../navbar/NavBarFooter"
import NavBarHeader from "../navbar/NavBarHeader"

const NavBar = ({ setTogglePosts , setFindJobs ,setCreateJobs, toggleJobsListings, setToggleJobsListings, user }) => {

    return (
        <div className="nav-bar-container row">
            {user && (<><NavBarHeader user={user} />  <NavBarFooter user={user} setTogglePosts={setTogglePosts} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs} toggleJobsListings={toggleJobsListings} setToggleJobsListings={setToggleJobsListings}/></>)}
        </div>

      
    )
}


export default NavBar