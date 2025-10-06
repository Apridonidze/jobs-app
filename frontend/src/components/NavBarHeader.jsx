const NavBarHeader = ( { user } ) => {
    return(
        <div className="nav-bar-header row">
            <div className="col">Login</div>
            <div className="col">Link to your profile : {user.name}</div>
        </div>
    )
}


export default NavBarHeader