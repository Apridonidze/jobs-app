import { Link } from "react-router-dom";
import Footer from "../components/Foooter";
import AuthNavBar from "../navbar/AuthNavBar";

const NotFound = () => {
    return (
        <div className="notfound-container container text-center d-flex flex-column justify-content-between min-vh-100 gap-5 align-items-center">

            <AuthNavBar />

            <div className="error-container w-50 ">
                <h1 className="py-2">Error 404!</h1>
                <h3 className="py-2">This Page Does Not Exists</h3>
                <Link to='/' className="btn btn-primary w-100 py-2">Go To Home Page</Link>
            </div>

            <Footer />
        </div>
    );
};

document.title = 'Jobs App - Page Not Found'

export default NotFound;