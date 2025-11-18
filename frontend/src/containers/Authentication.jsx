import Footer from '../components/Foooter'; 
import AuthNavBar from "../navbar/AuthNavBar"; //importing jsx components


const Authentication = () => {
    return (
        <div className="authentication-container container text-center d-flex flex-column justify-content-between min-vh-100 gap-5 ">
            
            <AuthNavBar />
            
            <div className="authentication-body d-flex flex-column gap-5 pt-5">
                <h1>Jobs App</h1>
                <h3>Welcome to Jobs App — your all-in-one platform where recruiters can effortlessly publish job opportunities, and job-seekers can explore and apply in just a few clicks. Whether you’re hiring or looking for your next role, everything happens here in one simple, streamlined interface.</h3>
            </div>         

            <Footer />
        </div>
    );
};

document.title = 'Jobs App - Welcome'; //adds title to page 

export default Authentication; //exporting component