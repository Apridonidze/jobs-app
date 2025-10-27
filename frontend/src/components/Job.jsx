import axios from "axios"

const Job = ( { job ,key , jobId } ) => {


    const APPLY_URL = '' 
    const SAVE_URL = ''

    const handleApply = async(e) => {

        e.preventDefault()

        try{

            await Promise.all([
                axios.post(APPLY_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  auth})
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
                axios.post(SAVE_URL, {job_id : job.job_id , user_id : job.user_id} , {headers:  auth})
                .then(resp => console.log(resp))
            ])

        }catch(err){
            console.log(err)
        }

    }

    const handleSeeMore = (e) => {

        e.preventDefault()
    }

    return(
        <div className="job-container col-5 border border-1 d-flex flex-column  justify-content-between min-vh-50 py-2" key={jobId}>
            <div className="job-header">
            
                <h4 className="text-break">{job.job_title}</h4>
                <h6 className="text-break">{job.job_desc}</h6>
            
            </div>
            
            <div className="job-footer">
                
                <h6>Looking For : {job.job_employeeList}</h6>
                <h6>Technologies : {job.job_technologies}</h6>
            
            </div>

           <div className="buttons row d d-flex flex-column gap-2">
                <div className="buttons-header d d-flex gap-2 col">
                    <button className="btn btn-success w-50" onClick={(e) => handleApply(e)}>Apply</button>
                    <button className="btn border border-2 border-success w-50" onClick={(e) => handleSave(e)}>Save</button>
                </div>
                <div className="buttons-footer col">
                    <button className="btn btn-primary w-100" onClick={(e) => handleSeeMore(e)}>See More...</button>
                </div>
           </div>
        </div>
    )
}


export default Job