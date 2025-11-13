import { Link } from "react-router-dom"; //component for navigation

import Footer from '../components/Foooter'; //jsx component 


const Authentication = () => {
    return (
        <div className="authentication-container container text-center d-flex flex-column justify-content-between min-vh-100 gap-5">
            
            <div className="authentication-header container-fluid d-flex align-items-center py-4 border-bottom justify-content-between ">
                <div className="header-start">
                    <Link to='/' className="alert-link fs-4">JOBS APP</Link>
                </div>
                
                <div className="header-end d-flex gap-4">
                    
                    <Link to='/sign' className=" btn border rounded-2 py-2 px-4">Sign</Link>
                    <Link to='/login' className="btn border rounded-2 py-2 px-4">Login</Link>
                
                </div>
            </div>
            
            <div className="authentication-body d-flex flex-column gap-5 pt-5">
                <h1>Jobs App</h1>
                <h3>Welcome to Jobs App — your all-in-one platform where recruiters can effortlessly publish job opportunities, and job-seekers can explore and apply in just a few clicks. Whether you’re hiring or looking for your next role, everything happens here in one simple, streamlined interface.</h3>
            </div>         

            <Footer />
        </div>
    )
}

document.title = 'JOBS-APP'; //adds title to page 

export default Authentication; //exporting component