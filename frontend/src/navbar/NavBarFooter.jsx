const NavBarFooter =  ( { setFindJobs ,setCreateJobs , setToggleJobsListings,user } ) => {
    return (
        <div className="nav-bar-footer d d-flex justify-content-between">
            
            <div className="footer-left">
                {user && (user.role === 'Recruiter' ? <button className="btn" onClick={() => { setCreateJobs(true) ; setFindJobs(false), setToggleJobsListings(false)}}>Create Job Offer</button> : <button className="btn" onClick={() => {setCreateJobs(false) ; setFindJobs(true), setToggleJobsListings(false)}}>Find Job</button>)}
            
            </div>
            
            <div className="footer-right">
                <button className="btn" onClick={() => {setToggleJobsListings(true) , setCreateJobs(false) ,setFindJobs(false)}}>Jobs Listings</button>
            </div>

        </div>
    )
}

export default NavBarFooter