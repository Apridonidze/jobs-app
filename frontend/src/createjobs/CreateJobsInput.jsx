import axios from "axios" ;
import { useCookies } from "react-cookie";//imporrting react libraries

import { useRef, useState } from "react"; //importing react hooks

import '../main.css'; //importing css 

const CreateJobsInput = ( {  setIsJobsSuccessful ,setToggleJobsMessage , setJobsMessage,SubmitBtnRef ,setToggleError} ) => {



    const [cookies] = useCookies(['token']); //cookies
    const NEW_JOBS_URL = 'http://localhost:8080/jobs/new-jobs'; //post url to create new job


    const [title,setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [employeeList,setEmployeeList] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [languages, setLanguages] = useState([]); //states for inputs

    const [titleErr, setTitleErr] = useState('');
    const [descErr, setDescErr] = useState('');
    const [employeeListErr, setEmployeeListErr] = useState('');
    const [technologiesErr, setTechnologiesErr] = useState('');
    const [languagesErr, setLanguagesErr] = useState('');//states for input errors

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const employeeListRef = useRef(null);
    const technologiesRef = useRef(null);
    const languageRef = useRef(null);//refs to style inputs error || success


    const handleEmployees = (e) => {

        if(e === 'blank') return; //retruns nothing if default value is choosed
        
        if(employeeList.includes(e))return; //returns nothing if employee role is already in list

        setEmployeeList(employeeList => [...employeeList , e]); //else sets role in state
        
    };//handles employee's roles selection input

    const handleTechnologies = (e) => {

        
        if(e === 'blank')return; //retruns nothing if default value is choosed
        
        if(technologies.includes(e))return; //retruns nothing if employee technologiy is already in list

        setTechnologies(technologies => [...technologies, e]); //else sets technology in state

    };//handles employee's technologies selection input

    const handleLanguages = (e) => {

        
        if(e === 'blank')return; //returns nothing if default value is choosed
        
        if(languages.includes(e))return; //returns nothing if employee language is already in list

        setLanguages(languages => [...languages, e]); //else sets language in state
        
    }; //handles employee's speaking language selection input


    const handleSubmit = async (e) => {

        e.preventDefault(); //prevent page refresh when clicked

        
        let data = {};
        let isValid = false; //variables for inputs


        if(title == '' || title == ' ' || title == null ||title == undefined){isValid = false ; setTitleErr(`This Field Can't Be Empty`) ; titleRef.current.classList.add('is-invalid');titleRef.current.classList.remove('is-valid')}
        else if(title.length < 6){isValid = false ; setTitleErr(`Title Length Is Too Small`) ; titleRef.current.classList.add('is-invalid');titleRef.current.classList.remove('is-valid')}
        else if(title.length > 55){isValid = false ; setTitleErr(`Title Length Is Too Long`) ; titleRef.current.classList.add('is-invalid');titleRef.current.classList.remove('is-valid')}
        else {isValid = true ; setTitleErr('') ; titleRef.current.classList.remove('is-invalid'); ;titleRef.current.classList.add('is-valid'); data = {...data, title: title}} //filters recruiterse title input and validates it

        if(desc == '' || desc == ' ' || desc == null ||desc == undefined){isValid = false ; setDescErr(`This Field Can't Be Empty`) ; descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else if(desc.length < 25){isValid = false ; setDescErr(`Description Length Is Too Small`) ; descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else if(desc.length > 500){isValid = false ; setDescErr(`Description Length Is Too Long`) ; descRef.current.classList.add('is-invalid');descRef.current.classList.remove('is-valid')}
        else {isValid = true ; setTitleErr('') ; descRef.current.classList.remove('is-invalid'); ;descRef.current.classList.add('is-valid'); data = {...data, desc: desc}}//filters recruiterse description input and validates it

        
        if(employeeList == '' || employeeList== ' ' || employeeList == null ||employeeList == undefined || employeeList.length < 1){isValid = false ; setEmployeeListErr(`This Field Can't Be Empty`) ; employeeListRef.current.classList.add('is-invalid');employeeListRef.current.classList.remove('is-valid')}
        else if(employeeList.length > 10){isValid = false ; setEmployeeListErr(`Invalid Employees Amount`) ; employeeListRef.current.classList.add('is-invalid');employeeListRef.current.classList.remove('is-valid')}
        else {isValid = true ; setEmployeeListErr('') ; employeeListRef.current.classList.remove('is-invalid'); ;employeeListRef.current.classList.add('is-valid'); data = {...data, employeeList: employeeList}} //filters recruiterse employeelist input and validates it

          
        if(technologies== '' || technologies== ' ' || technologies == null ||technologies == undefined || technologies.length < 1){isValid = false ; setTechnologiesErr(`This Field Can't Be Empty`) ; technologiesRef.current.classList.add('is-invalid');technologiesRef.current.classList.remove('is-valid')}
        else if(technologies.length > 26){isValid = false ; setTechnologiesErr(`Invalid Technologies Amount`) ; technologiesRef.current.classList.add('is-invalid');technologiesRef.current.classList.remove('is-valid')}
        else {isValid = true ; setTechnologiesErr('') ; technologiesRef.current.classList.remove('is-invalid'); ;technologiesRef.current.classList.add('is-valid'); data = {...data, technologies: technologies}} //filters recruiterse technologies input and validates it

        if(languages == '' || languages== ' ' || languages == null ||languages == undefined || languages.length < 1){isValid = false ; setLanguagesErr(`This Field Can't Be Empty`) ; languageRef.current.classList.add('is-invalid');languageRef.current.classList.remove('is-valid')}
        else if(languages.length > 3){isValid = false ; setLanguagesErr(`Invalid Technologies Amount`) ; languageRef.current.classList.add('is-invalid');languageRef.current.classList.remove('is-valid')}
        else {isValid = true ; setLanguagesErr('') ; languageRef.current.classList.remove('is-invalid'); ;languageRef.current.classList.add('is-valid'); data = {...data, languages: languages}}//filters recruiterse language input and validates it


        if(isValid){ //if all inputs are valid then this function executesw
            try{
                await axios
                .post(NEW_JOBS_URL, {data}  , {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => {
                    setJobsMessage(resp.data.message); //sets jobs creation message 
                    setIsJobsSuccessful(true); //sets jobs creattion success to true
                    setToggleJobsMessage(true); //toggles jobs message component
                    setToggleError(false) ; //does not toggle error message component since job is created successfully
            });
            }catch(err){
                setToggleError(true) //toggles error mesasge component
                console.log(err); //consoles error message
            };


        };

    }; //function toggles when recruiter clicks on Create Job Offer button , it validates inputs and returns errors , if all inputs are correct then it executes post statement to server to insert new job variables into database


    return (
        <div className="create-jobs-input-container container position-fixed bg-white d-flex flex-column top-25  p-4 rounded-2" style={{zIndex : 5000}} >


            <h1>Create Job Offer</h1>
            
            <form onSubmit={handleSubmit}  className="d-flex flex-column gap-4">
                
                <div className="form-floating">
                    <input className="form-control text-start" type="text" name="title" onChange={e => setTitle(e.target.value)} value={title} placeholder="Create Job Title (For Example : Building Market Startup)" ref={titleRef}/>
                    <label htmlFor="title">Create Job Title (For Example : Building Market Startup)</label>
                    <span className="text-danger">{titleErr}</span>
                </div>   

            
                <div className="form-floating">
                    <input className="form-control text-break"  type="text" name="title" onChange={e => setDesc(e.target.value)} value={desc} placeholder="Add Job Description..." ref={descRef}/>
                    <label htmlFor="title">Add Job Description...</label>    

                    <span className="text-danger">{descErr}</span>
                </div>

                <div className="form">
                    <select className="form-control" onChange={e => handleEmployees(e.target.value)} ref={employeeListRef}>
                        <option value="blank">Who Are You Searching For</option>
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

                    <div className="choosed-roles d d-flex mt-2">
                        {employeeList.map((e,i) => (
                            <span className="border border-1 py-1 px-2 rounded-3 bg-success text-white" key={i} onClick={() => setEmployeeList(employeeList.filter(emp => emp !== e))}>{e}</span>
                        ))}
                    </div>

                    <span className="text-danger">{employeeListErr}</span>

                </div>

                <div className="form">
                    <select className="form-control" onChange={e => handleTechnologies(e.target.value)} ref={technologiesRef}>
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
                        
                    <div className="choosed-techonologies d-flex mt-2">
                        {technologies.map((e,i) => (
                            <span className="border border-1 py-1 px-2 rounded-3 bg-success text-white"  key={i} onClick={() => setTechnologies(technologies.filter(tech => tech !== e))}>{e}</span>
                        ))}
                    </div>
                    
                    <span className="text-danger">{technologiesErr}</span>

                </div>


                <div className="form">
                    <select className="form-control" onChange={e => handleLanguages(e.target.value)} ref={languageRef}>
                        <option value="blank">What Languages Do You Prefer That Employee Speaks</option>
                        <option value="English">🇬🇧 English</option>
                        <option value="Russian">🇷🇺 Russian</option>
                        <option value="Georgian">🇬🇪 Georgian</option>
                    </select>
                        
                    <div className="choosed-languages d-flex mt-2">
                        {languages.map((e,i) => (
                            <span className="border border-1 py-1 px-2 rounded-3 bg-success text-white"  key={i} onClick={() => setLanguages(languages.filter(lang => lang !== e))}>{e}</span>
                        ))}
                    </div>

                    <span className="text-danger">{languagesErr}</span>
                </div>


                <button type="submit"  className="btn btn-success" ref={SubmitBtnRef}>Create Job Opportunity</button>

            </form>
           
        </div>
    );
};


export default CreateJobsInput; //exporting component