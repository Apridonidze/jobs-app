const NavBarHeader = ( { user } ) => {
    return(
        <div className="nav-bar-header row">
            {user && (<div className="col"><span>Logo here!!!</span></div> ,<div className="col">your account : {user.role}</div>)}
        </div>
    )
}


export default NavBarHeader