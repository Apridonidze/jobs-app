const NavBar = ({ user }) => {

    //add buttons in middle col to display create new posts components or job searching window
    return (
        <div className="nav-bar-container row">
            <div className="col"><span>Logo here!!!</span></div>
            <div className="col"><span>Create new posts</span> <span>find job || employee</span></div>
            <div className="col">your account : user.name</div>
        </div>
    )
}


export default NavBar