import { useCallback, useEffect, useState } from "react"
import { Cookies, useCookies } from "react-cookie"
import axios from "axios"

const Job = ({ job, user, setToggleSeeMore,  }) => {

    const [cookies] = useCookies(['token'])
    const [isApplied, setIsApplied] = useState(null)
    const [isSaved, setIsSaved] = useState(null)

    const IS_SAVED_URL = 'http://localhost:8080/saved/check-job'
    const IS_APPLIED_URL = 'http://localhost:8080/applied/check-applied'
    
    const SAVE_URL = 'http://localhost:8080/saved'
    const APPLY_URL = 'http://localhost:8080/applied'


    const handleSave = async() => {
        const res = await axios.post(`${SAVE_URL}/${job.job_id}` , {} , {headers: {Authorization : `Bearer ${cookies.token}`}})
        console.log(res)
    }

    
    const handleApply = () => {
        console.log(job.job_id)
    }

    return (
        <div className="job-container col-5 border border-1 d-flex flex-column justify-content-between min-vh-50 py-2" key={job.job_id}>
            <div className="job-header">
                <h4 className="text-break">{job.job_title}</h4>
                <h6 className="text-break">{job.job_desc}</h6>
            </div>

            <div className="job-footer">
                <h6>Looking For : {job.job_employeeList}</h6>
                <h6>Technologies : {job.job_technologies}</h6>
            </div>

            <div className="buttons row d-flex flex-column gap-2">
                <div className="job-buttons d-flex w-100 justify-content-between gap-2">
                    {isApplied
                        ? <button className="btn btn-success opacity-50 w-50">Applied</button>
                        : <button className="btn btn-success w-50" onClick={handleApply}>Apply</button>
                    }
                    {isSaved
                        ? <button className="btn opacity-75 border w-50 position-relative">Saved</button>
                        : <button className="btn border w-50" onClick={handleSave}>Save</button>
                    }
                </div>

                <div className="buttons-footer col">
                    <button className="btn btn-primary w-100" onClick={() => setToggleSeeMore({ status: true, job_id: job.job_id })}>
                        See More...
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Job
