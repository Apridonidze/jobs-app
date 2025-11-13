import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <div className="footer-container container border-top border-2 py-2">
            <div className="footer-start d-flex flex-column flex-sm-row gap-3">

                <div className="about border-end px-3 pt-3 col text-start">
                    <h5>About Jobs App : </h5>
                    <div className="about-footer d-flex ">
                        <h6>Find Jobs, </h6>
                        <h6>Hire Fast.</h6>
                    </div>
                </div>

                <div className="quick-links border-end px-3 pt-3 text-start col">
                    <h5>Quick Links : </h5>
                    <div className="quick-links-footer d-flex flex-column gap-3">
                        <Link to='' className="fs-5">Sign</Link>
                        <Link to='' className="fs-5">Login</Link>
                    </div>
                </div>

                <div className="contact border-end px-3 pt-3 text-start col">

                    <div className="contact-start d-flex flex-column">
                        <h5>contact : </h5>
                    </div>

                    <div className="contant-end d-flex flex-column text-start">
                        <h5><i class="fa-solid fa-envelope"></i> Email : giorgiapridonidze08@gmail.com</h5>
                        <h5><i class="fa-brands fa-github"></i> Github : <a href="https://github.com/Apridonidze">Github</a> </h5>
                        <h5><i class="fa-brands fa-linkedin"></i> Linkedin : <a href="https://www.linkedin.com/in/giorgi-aphridonidze-7aa896291/">LinkedIn</a> </h5>
                    </div>
                    

                </div>

                
                <div className="copy-rights px-3 py-3 text-start col">
                    <h5>Jobs App © 2025</h5>
                    <h5>Built by Giorgi Apridonidze.</h5>
                </div>
                

            </div>
        </div>
    );
};

export default Footer;