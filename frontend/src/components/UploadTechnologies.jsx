import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import '../main.css'; //importing css file

const UploadTechnologies = ( { technologies ,setTechnologies ,setToggleError } ) => {

    const [cookies] = useCookies(['token']) ; //cookies

    const UPLOAD_TECH_URL = 'http://localhost:8080/technologies/new-technologies' ; //api to upload new technologies

    const handleUploadTech = async(e) => {

        e.preventDefault();

        if(technologies.length < 1)return;

        try{

            await axios.post(UPLOAD_TECH_URL , {technologies : technologies} , {headers : {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => {console.log(resp) ; setToggleError(false)}) ; //post technologies to server and consoles response

        }catch(err){

            console.log(err); //consoles erorr
            setToggleError(true); // toggles Error component if error occurs
        
        };

    }; //function toggles when upload button is clicked


    return(
        <div className="upload-technologies-container position-fixed bg-white p-3 rounded-2 fs-5 d-flex flex-column ">

            <form className="my-2" onSubmit={handleUploadTech}>

                <select className="form-control" onChange={(e) => {setTechnologies(technologies => [...technologies, e.target.value]) ;if(e.target.value === 'blank') setTechnologies(technologies) ; if(technologies.includes(e.target.value)) setTechnologies(technologies) ; return}}>
                    <option value="blank">What Technologies Are You Searching In Employee</option>
                    <option value="GO">GO</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="C">C</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Cobol">Cobol</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Swift">Swift</option>
                    <option value="Perl">Perl</option>
                    <option value="Rust">Rust</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Javacript">Javacript</option>
                    <option value="PHP">PHP</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="React">React</option>
                    <option value="Vue.js">Vue.js</option>
                    <option value="Laravel">Laravel</option>
                    <option value="AWS">AWS</option>
                    <option value="Azure">Azure</option>
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="MySQL">MySQL</option>
                    <option value="MongoDb">MongoDb</option>
                    <option value="Postgres">Postgres</option>
                </select>

                <div className="technologies-list d-flex flex-wrap gap-2 my-2 p-2 border rounded-3">
                    {technologies && technologies.map((tech, techId) => (
                        <span className="bg-primary text-white px-3 py-2 rounded-3 flex-grow-1 text-center shadow-sm" key={techId} onClick={() => setTechnologies(technologies.filter(t => t !== tech))}>{tech}</span>
                    ))}
                </div>

                <input className="btn btn-success w-100" type="submit" value="Upload Your Technologies List" />
        
        </form>

        </div>
    );
};


export default UploadTechnologies; //exporting component