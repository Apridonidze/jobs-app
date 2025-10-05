import { Link } from "react-router-dom"

const Authentication = () => {
    return (
        <div className="authentication-container">
            Authentication.jsx
            
            <Link to='/sign'>Sign</Link>
            <Link to='/login'>Login</Link>
        </div>
    )
}


//add titles to this page

export default Authentication