import NavBarFooter from "../navbar/NavBarFooter"
import NavBarHeader from "../navbar/NavBarHeader"

const NavBar = ({ setTogglePosts , setFindJobs ,setCreateJobs, toggleJobsListings, setToggleJobsListings, user , setToggleSaved, setToggleApplied, setTogglePending }) => {

    return (
        <div className="nav-bar-container container">
            {user && (<><NavBarHeader user={user} />  <NavBarFooter user={user} setTogglePosts={setTogglePosts} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs} toggleJobsListings={toggleJobsListings} setToggleJobsListings={setToggleJobsListings} setToggleSaved={setToggleSaved} setToggleApplied={setToggleApplied} setTogglePending={setTogglePending}/></>)}
        </div>

      
    )
}


export default NavBar