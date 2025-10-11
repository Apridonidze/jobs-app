const NavBarFooter =  ( { setFindJobs ,setCreateJobs , toggleJobsListings, setToggleJobsListings,user } ) => {
    return (
        <div className="nav-bar-footer row">

            {user && (user.role === 'Recruiter' ? <button onClick={() => { setCreateJobs(true) ; setFindJobs(false), setToggleJobsListings(false)}}>Create Job Offer</button> : <button onClick={() => {setCreateJobs(false) ; setFindJobs(true), setToggleJobsListings(false)}}>Find Job</button>)}

            <button onClick={() => {setToggleJobsListings(true) , setCreateJobs(false) ,setFindJobs(false)}}>Jobs Listings</button>
        </div>
    )
}


export default NavBarFooter