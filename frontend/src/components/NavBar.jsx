const NavBar = ({ user }) => {

    //add buttons in middle col to display create new posts components or job searching window
    return (
        <div className="nav-bar-container row">
            <div className="col"><span>Logo here!!!</span></div>

            <div className="col">
                
                <button>Create Posts</button>
                {user.role === 'Recruiter' ? <button >Create Job</button> : <button>Find Job</button>}
                

            </div>
            
            <div className="col">your account : {user.role}</div> {/**create link to user page */}
        </div>
    )
}


export default NavBar