import { useEffect, useRef, useState } from "react"

const CreateJobsInput = () => {

    const [title,setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [employeeList,setEmployeeList] = useState([''])
    const [languages, setLanguages] = useState([''])

    const [titleErr, setTitleErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [employeeListErr, setEmployeeListErr] = useState('')
    const [languagesErr, setLanguagesErr] = useState('')

    const titleRef = useRef(null)
    const descRef = useRef(null)
    const employeeListRef = useRef(null)
    const languageRef = useRef(null)

    const handleEmployees = (e) => {

        if(e === 'blank')return
        
        if(employeeList.includes(e))return

        setEmployeeList(employeeList => [...employeeList , e])
        
    }

    const handleLanguages = (e) => {
        
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
                    <select className="form-control" onChange={e => handleLanguages(e.target.value)} ref={languageRef}>
                        <option value="blank">What Technologies Are You Searching In Employee</option>
                    </select>
                        
                    <div className="choosed-techonologies"></div>
                </div>


                <div className="form">
                    <select className="form-control" onChange={e => handleLanguages(e.target.value)} ref={languageRef}>
                        <option value="blank">What Languages Do You Prefer That Employee Speaks</option>
                    </select>
                        
                    <div className="choosed-languages"></div>
                </div>


                <button type="submit" className="btn btn-success">Create Job Opportunity</button>

            </form>
           
        </div>
    )
}


export default CreateJobsInput