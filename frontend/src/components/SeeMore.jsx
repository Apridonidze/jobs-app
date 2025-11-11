import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"
import axios from "axios"


const SeeMore = ({ user, job , savedJobs , appliedJobs  }) => { 

    const [cookies] = useCookies(['token'])
    const [isApplied, setIsApplied] = useState(null)
    const [isSaved, setIsSaved] = useState(null)

    
    const SAVE_URL = 'http://localhost:8080/saved'
    const APPLY_URL = 'http://localhost:8080/applied'
  
    const handleSave = async() => {
        const res = await axios.post(`${SAVE_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}})
        console.log(res)
        setIsSaved(true)
    }

    
    const handleApply = async() => {
        
        const res = await axios.post(`${APPLY_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}})
        console.log(res)
        setIsApplied(true)
    }



     useEffect(() => {
        
        const filterSavedJob = async() =>{
            const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == job.job_id)
        if(savedJobList.length > 0){

            if(savedJobList[0].job_id === job.job_id) setIsSaved(true)
        }
        return 
        }

        const filterAppliedJob = async() =>{
            const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == job.job_id)
        if(appliedJobList.length > 0){

            if(appliedJobList[0].job_id === job.job_id) setIsApplied(true)
                else return
        }
        } 

        filterSavedJob()
        filterAppliedJob()

     },[savedJobs,appliedJobs])



    return (
        <div className="job-container col-5 border border-1 d-flex flex-column justify-content-between min-vh-50 py-2 position-fixed bg-white" key={job.job_id}>
            <div className="job-header">
                <h4 className="text-break">{job.job_title}</h4>
                <h6 className="text-break">{job.job_desc}</h6>
            </div>

            <div className="job-footer">
                <h6>Looking For : {job.job_employeeList}</h6>
                <h6>Technologies : {job.job_technologies}</h6>
            </div>

            <div className="buttons row d-flex flex-column gap-2">
                {user.role !== 'Recruiter' && <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                    {isApplied
                        ? <button className="btn btn-success opacity-50 w-50">Applied</button>
                        : <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>
                    }
                    {isSaved
                        ? <button className="btn opacity-75 border w-50 position-relative">Saved</button>
                        : <button className="btn border w-50" onClick={handleSave}>Save</button>
                    }
                </div>}

            </div>
        </div>
    )
}// add layout and design for it


export default SeeMore;
