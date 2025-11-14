import NavBarFooter from "../navbar/NavBarFooter";
import NavBarHeader from "../navbar/NavBarHeader";//importing react component

const NavBar = ({ setTogglePosts , setFindJobs ,setCreateJobs, toggleJobsListings, setToggleJobsListings, user , setToggleSaved, setToggleApplied, setTogglePending }) => {

    return (
        <div className="nav-bar-container container">
            {user && (<><NavBarHeader user={user} />  <NavBarFooter user={user} setTogglePosts={setTogglePosts} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs} toggleJobsListings={toggleJobsListings} setToggleJobsListings={setToggleJobsListings} setToggleSaved={setToggleSaved} setToggleApplied={setToggleApplied} setTogglePending={setTogglePending}/></>)}
        </div>

      
    );
};//toggles components when user is fetched and not null 


export default NavBar;//exporting component