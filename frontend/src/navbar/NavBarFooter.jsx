const NavBarFooter =  ( { setFindJobs ,setCreateJobs , setToggleJobsListings,user, setToggleSaved, setToggleApplied, setTogglePending } ) => {
    return (
        <div className="nav-bar-footer d d-flex justify-content-between">
            
            <div className="footer-left">
                {user && (user.role === 'Recruiter' ? <button className="btn" onClick={() => { setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(true) ; setFindJobs(false), setToggleJobsListings(false)}}>Create Job Offer</button> : <button className="btn" onClick={() => {setToggleSaved(true); setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(true), setToggleJobsListings(false)}}>Find Job</button>)}
            
            </div>
            
            <div className="footer-right">
                {user.role === 'Employee' ? <><button className="btn" onClick={() => {setToggleSaved(true); setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(false)}}>Saved</button> <button className="btn" onClick={() => {setToggleSaved(false); setToggleApplied(true) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(false)}}>Applied Jobs</button> </>: <button className="btn" onClick={() => {setToggleSaved(false); setToggleApplied(false) ; setTogglePending(true) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(false)}}>Job Pending</button>}
                <button className="btn" onClick={() => {setToggleSaved(true); setToggleApplied(false) ; setTogglePending(false) ; setCreateJobs(false) ; setFindJobs(false), setToggleJobsListings(true)}}>Jobs Listings</button>
            </div>

        </div>
    )
}

export default NavBarFooter