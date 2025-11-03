import axios from "axios"
import { useCookies } from "react-cookie"


const JobHolder = ( {user, job} ) => {

    const [cookies] = useCookies(['token'])
    
    const APPLY_URL = 'http://localhost:8080/applied/post-my-applied-jobs' 
    const SAVE_URL = 'http://localhost:8080/saved/post-my-saved-jobs'


    const handleApply = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(APPLY_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])

        }catch(err){
            console.log(err)
        }

    }

    const handleSave = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(SAVE_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])

        }catch(err){
            console.log(err)
        }

    }

    return(
        <div className="job-holder-container">
            <div className="job-info">
                    
                <h1>{job.job_title}</h1>
                <h2>{job.job_desc}</h2>
                <h3>{job.job_employeeList}</h3>
                <h3>{job.job_technologies}</h3>
                <h3>{job.job_languages}</h3>

            </div>

            {user.role !== 'Recruiter' && 
            <div className="buttons-header d d-flex gap-2 col">

                <button className="btn btn-success w-50" onClick={(e) => handleApply(e)}>Apply</button>
                <button className="btn border border-2 border-success w-50" onClick={(e) => handleSave(e)}>Save</button>

            </div>
            }

        </div>
    )
}


export default JobHolder