const NavBarFooter =  ( { user } ) => {
    return (
        <div className="nav-bar-footer row">
          
            <button>Create Posts</button>
            {user && (user.role === 'Recruiter' ? <button >Create Job Offer</button> : <button>Find Job</button>)}

        </div>
    )
}


export default NavBarFooter