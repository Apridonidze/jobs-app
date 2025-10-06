const NavBarFooter =  ( { setToggleComponents , user } ) => {
    return (
        <div className="nav-bar-footer row">
          
            <button onClick={setToggleComponents('toggleCreatePosts')}>Create Posts</button>
            {user && (user.role === 'Recruiter' ? <button onClick={() => setToggleComponents('toggleJobOffer')}>Create Job Offer</button> : <button onClick={() => setToggleComponents('toggleJobSearch')}>Find Job</button>)}

        </div>
    )
}


export default NavBarFooter