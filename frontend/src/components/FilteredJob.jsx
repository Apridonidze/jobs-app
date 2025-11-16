import { useCookies } from "react-cookie"
import axios from "axios"

const FilteredJob = ( { filteredJob , filteredJobId , key } ) => {
    
    const [cookies] = useCookies(['token'])
    
    const APPLY_URL = 'http://localhost:8080/applied/post-my-applied-jobs' 
    const SAVE_URL = 'http://localhost:8080/saved/post-my-saved-jobs'


    const handleApply = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(APPLY_URL, {job_id : filteredJob.job_id , user_id : filteredJob.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
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
                axios.post(SAVE_URL, {job_id : filteredJob.job_id , user_id : filteredJob.user_id} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])

        }catch(err){
            console.log(err)
        }

    }

    const handleSeeMore = (e) => {

        e.preventDefault()
    }

    return (
        <div className="filtered-job-container col-5 border border-1 d-flex flex-column  justify-content-between py-2" style={{minHeight : '60vh'}} key={filteredJobId}>
            <div className="filtered-job-header">
            
                <h4 className="text-break">{filteredJob.job_title}</h4>
                <h6 className="text-break">{filteredJob.job_desc}</h6>
            
            </div>
            
            <div className="filtered-job-footer">
                
                <h6>Looking For : {filteredJob.job_employeeList}</h6>
                <h6>Technologies : {filteredJob.job_technologies}</h6>
            
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
export default FilteredJob