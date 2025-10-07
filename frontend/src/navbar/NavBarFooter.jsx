const NavBarFooter =  ( { setTogglePosts , setFindJobs ,setCreateJobs ,user } ) => {
    return (
        <div className="nav-bar-footer row">
          
            <button onClick={() => {setTogglePosts(true); setCreateJobs(false) ; setFindJobs(false) }}>Posts</button>


            {user && (user.role === 'Recruiter' ? <button onClick={() => {setTogglePosts(false); setCreateJobs(true) ; setFindJobs(false)}}>Create Job Offer</button> : <button onClick={() => {setTogglePosts(false); setCreateJobs(false) ; setFindJobs(true)}}>Find Job</button>)}

        </div>
    )
}


export default NavBarFooter