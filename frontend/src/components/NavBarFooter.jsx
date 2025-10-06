const NavBarFooter =  ( { setCreatePosts , setFindJobs ,setCreateJobs ,user } ) => {
    return (
        <div className="nav-bar-footer row">
          
            <button onClick={() => {setCreatePosts(true); setCreateJobs(false) ; setFindJobs(false) }}>Create Posts</button>


            {user && (user.role === 'Recruiter' ? <button onClick={() => {setCreatePosts(false); setCreateJobs(true) ; setFindJobs(false)}}>Create Job Offer</button> : <button onClick={() => {setCreatePosts(false); setCreateJobs(false) ; setFindJobs(true)}}>Find Job</button>)}

        </div>
    )
}


export default NavBarFooter