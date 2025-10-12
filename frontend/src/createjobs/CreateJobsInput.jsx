import { useEffect, useRef, useState } from "react"

const CreateJobsInput = () => {

    const [title,setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [employeeList,setEmployeeList] = useState([''])
    const [technologies, setTechnologies] = useState([''])
    const [languages, setLanguages] = useState([''])

    const [titleErr, setTitleErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [employeeListErr, setEmployeeListErr] = useState('')
    const [technologiesErr, setTechnologiesErr] = useState('')
    const [languagesErr, setLanguagesErr] = useState('')

    const titleRef = useRef(null)
    const descRef = useRef(null)
    const employeeListRef = useRef(null)
    const technologiesRef = useRef(null)
    const languageRef = useRef(null)

    const handleEmployees = (e) => {

        if(e === 'blank')return
        
        if(employeeList.includes(e))return

        setEmployeeList(employeeList => [...employeeList , e])
        
    }

    const handleTechnologies = (e) => {

        
        if(e === 'blank')return
        
        if(technologies.includes(e))return

        setTechnologies(technologies => [...technologies, e])

    }

    const handleLanguages = (e) => {

        
        if(e === 'blank')return
        
        if(languages.includes(e))return

        setLanguages(languages => [...languages, e])
        
    }
    
    return (
        <div className="create-jobs-input-container container position-absolute bottom-50 bg-white">
            
            <form>
                
                <div className="form-floating">
                    <input className="form-control text-start" type="text" name="title" onChange={e => setTitle(e.target.value)} value={title} placeholder="Create Job Title (For Example : Building Market Startup)" ref={titleRef}/>
                    <label htmlFor="title">Create Job Title (For Example : Building Market Startup)</label>    
                </div>   

            
                <div className="form-floating">
                    <input className="form-control text-break"  type="text" name="title" onChange={e => setDesc(e.target.value)} value={desc} placeholder="Add Job Description..." ref={descRef}/>
                    <label htmlFor="title">Add Job Description...</label>    
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

                    <div className="choosed-roles">
                        {employeeList.map((e,i) => (
                            <span key={i} onClick={() => setEmployeeList(employeeList.filter(emp => emp !== e))}>{e}</span>
                        ))}
                    </div>

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
                        
                    <div className="choosed-techonologies">
                        {technologies.map((e,i) => (
                            <span key={i} onClick={() => setTechnologies(technologies.filter(t => t !== e))}>{e}</span>
                        ))}
                    </div>
                </div>


                <div className="form">
                    <select className="form-control" onChange={e => handleLanguages(e.target.value)} ref={languageRef}>
                        <option value="blank">What Languages Do You Prefer That Employee Speaks</option>
                        <option value="English">🇬🇧 English</option>
                        <option value="Russian">🇷🇺 Russian</option>
                        <option value="Georgian">🇬🇪 Georgian</option>
                    </select>
                        
                    <div className="choosed-languages"></div>
                </div>


                <button type="submit" className="btn btn-success">Create Job Opportunity</button>

            </form>
           
        </div>
    )
}


export default CreateJobsInput