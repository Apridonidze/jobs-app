import { useEffect, useState } from "react"

const CreateJobsInput = () => {

    const [title,setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [employeeList,setEmployeeList] = useState([''])
    
    return (
        <div className="create-jobs-input-container container position-absolute top-50 bg-white">
            
            <div className="form-floating">
                <input className="form-control text-start" type="text" name="title" onChange={e => setTitle(e.target.value)} value={title} placeholder="Create Job Title (For Example : Building Market Startup)"/>
                <label htmlFor="title">Create Job Title (For Example : Building Market Startup)</label>    
            </div>   

            
            <div className="form-floating">
                <input className="form-control text-break"  type="text" name="title" onChange={e => setDesc(e.target.value)} value={desc} placeholder="Add Job Description..."/>
                <label htmlFor="title">Add Job Description...</label>    
            </div>

            <div className="form">
                <select className="form-control" onChange={e => setEmployeeList(employeeList => [...employeeList , e.target.value])}>
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
                        <span key={i}>{e}</span>
                    ))}
                </div>

            </div>

            <button className="btn btn-success">Create Job Opportunity</button>
           
        </div>
    )
}


export default CreateJobsInput