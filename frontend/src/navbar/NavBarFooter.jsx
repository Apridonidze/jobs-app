const NavBarFooter =  ( { setFindJobs ,setCreateJobs , toggleJobsListings, setToggleJobsListings,user } ) => {
    return (
        <div className="nav-bar-footer row">

            {user && (user.role === 'Recruiter' ? <button onClick={() => { setCreateJobs(true) ; setFindJobs(false)}}>Create Job Offer</button> : <button onClick={() => {setCreateJobs(false) ; setFindJobs(true)}}>Find Job</button>)}

            <button onClick={() => setToggleJobsListings(!toggleJobsListings)}>Jobs Listings</button>
        </div>
    )
}


export default NavBarFooter