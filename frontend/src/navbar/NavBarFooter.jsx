const NavBarFooter =  ( { setFindJobs ,setCreateJobs , setToggleJobsListings,user, setToggleSaved, setToggleApplied, setTogglePending } ) => { //importing props

    return (

        <div className="nav-bar-footer d-block d-sm-flex justify-content-between">
            
            <div className="footer-left pt-2">
                {user && (user.role === 'Recruiter' ?
                     <button className="btn border-2 border-bottom rounded-0" onClick={() => { setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(true) ; setFindJobs(false), setToggleJobsListings(false)}}>Create Job Offer</button> 
                     : <button className="btn border-2 border-bottom rounded-0" onClick={() => {setToggleSaved(false); setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(true), setToggleJobsListings(false)}}>Find Job</button>)}
            
            </div>
            
            <div className="footer-right pt-2">
                {user.role !== 'Employee' && <>
                <button className="btn border-2 border-bottom rounded-0" onClick={() => {setToggleSaved(true); setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(false)}}>Saved</button> 
                <button className="btn border-2 border-bottom rounded-0" onClick={() => {setToggleSaved(false); setToggleApplied(true) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(false)}}>Applied Jobs</button>
                
                {user.role === 'Recruiter' && <button className="btn border-2 border-bottom rounded-0" onClick={() => {setToggleSaved(false); setToggleApplied(false) ; setTogglePending(true) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(false)}}>Job Pending</button>}
                </>}
                <button className="btn border-2 border-bottom rounded-0" onClick={() => {setToggleSaved(false); setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(true)}}>Jobs Listings</button>
                
            </div>

        </div>

    );
};//component toggles buttons based on user role (Employee or Recruiter)

export default NavBarFooter;//exporting components