import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import '../main.css' ; //importing css file

const UploadRole = ( { setToggleError , setRoles, roles } ) => {

    const [cookies] = useCookies(['token']); //cookies

    const UPLOAD_ROLE_URL = 'http://localhost:8080/roles/upload-roles'; //api url to upload roles

    const handleUploadRole = async(e) => { //function triggers on Upload button

        e.preventDefault(); //prevent page reload when function triggers

        if(roles.length < 1) return; //does nothing if roles length is 0

        console.log('asdas')

        try{
            
            await axios.post(UPLOAD_ROLE_URL , {roles : roles}, {headers : {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => {console.log(resp) ; setToggleError(false)}); //sends post request to server and consoles response
        
        }catch(err){

            setToggleError(true) ; //toggles Error.jsx component
            console.log(err); //consoles error
            
        };

    };



    return(
        <div className="upload-role-container position-fixed bg-white p-3 rounded-2 fs-5 d-flex flex-column ">
            
            <form className="my-2" onSubmit={handleUploadRole}>

                <select className="form-control" onChange={(e) => {setRoles(roles => [...roles ,  e.target.value]) ;if(e.target.value === 'blank') return setRoles(roles) ; if(roles.includes(e.target.value)) return setRoles(roles) ; }}>        
                    <option value="blank">I Am A:</option>
                    <option value="Figma Designer">Figma Designer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">Fullstack Developer</option>
                    <option value="AI Enginner">AI Enginner</option>
                    <option value="Cybersecurity Enginner">Cybersecurity Developer</option>
                    <option value="DevOps Enginner">DevOps Enginner</option>
                    <option value="Cloud Enginner">Cloud Enginner</option>
                    <option value="Manual Tester">Manual Tester</option>
                    <option value="Automation Tester">Automat Tester</option>
                </select>

                <div className="role-list d-flex flex-wrap gap-2 my-2 p-2 border rounded-3">
                    {roles.map((role, roleId) => (
                        <span key={roleId} className="bg-primary text-white px-3 py-2 rounded-3 flex-grow-1 text-center shadow-sm" style={{ cursor: 'pointer', minWidth: "120px" }}onClick={() => setRoles(roles.filter(r => r !== role))}>
                            {role}
                        </span>
                    ))}
                </div>

                <input type="submit" className="btn btn-success w-100 my-2" value="Upload Your Roles" />

            </form>

        </div>
    );
};


export default UploadRole; //exporting component