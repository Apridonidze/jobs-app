import { useCookies } from "react-cookie"
import axios from "axios"
import { useState,useEffect } from "react"

const FilteredJob = ( { filteredJob , filteredJobId , key , setToggleSeeMore , savedJobs ,appliedJobs } ) => {
    
    const [cookies] = useCookies(['token'])
    
    const SAVE_URL = 'http://localhost:8080/saved'
    const APPLY_URL = 'http://localhost:8080/applied'
  

    const [isApplied , setIsApplied] = useState()
    const [isSaved , setIsSaved] = useState()

    const handleApply = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(`${APPLY_URL}/${filteredJob.job_id}`, {}  , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(setIsApplied(true))
            ])

        }catch(err){
            console.log(err)
        }

    }

    const handleSave = async(e) => {

        
        e.preventDefault()

         try{

            await Promise.all([
                axios.post(`${SAVE_URL}/${filteredJob.job_id}`, {} , {headers:  {Authorization : `Bearer ${cookies.token}`}})
                .then(setIsSaved(true))
            ])

        }catch(err){
            console.log(err)
        }

    }

     useEffect(() => {
            
            const filterSavedJob = async() =>{
                const savedJobList = await savedJobs.filter(savedJob => savedJob.job_id == filteredJob.job_id)
            if(savedJobList.length > 0){
    
                if(savedJobList[0].job_id === filteredJob.job_id) setIsSaved(true)
            }
            return 
            }
    
            const filterAppliedJob = async() =>{
                const appliedJobList = await appliedJobs.filter(appliedJob => appliedJob.job_id == filteredJob.job_id)
            if(appliedJobList.length > 0){
    
                if(appliedJobList[0].job_id === filteredJob.job_id) setIsApplied(true)
                    else return
            }
            } 
    
            filterSavedJob()
            filterAppliedJob()
    
        },[savedJobs,appliedJobs])

    return (
        <div className="filtered-job-container col-5 border border-1 d-flex flex-column  justify-content-between py-2"  key={filteredJobId}>
            <div className="filtered-job-header">
            
                <h4 className="text-break">{filteredJob.job_title}</h4>
                <h6 className="text-break">{filteredJob.job_desc.length > 160 ? `${filteredJob.job_desc.slice(0,160)}...` : filteredJob.job_desc}</h6>
            
            </div>
            
            <div className="filtered-job-footer">
                
                <h6>Looking For : {filteredJob.job_employeeList}</h6>
                <h6>Technologies : {filteredJob.job_technologies}</h6>
            
            </div>

           <div className="buttons row d d-flex flex-column gap-2">
                <div className="buttons-header d d-flex gap-2 col">
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
                    <button className="btn btn-primary w-100" onClick={() => setToggleSeeMore({status: true, job_id : filteredJob.job_id})}>See More...</button>
                </div>
           </div>
        </div>
    )
}
export default FilteredJob