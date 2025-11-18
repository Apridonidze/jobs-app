import { useState, useEffect } from "react";
import '../main.css'

const NewJobsMessage = ( { isJobsSuccessful ,jobsMessage ,setToggleJobsMessage, setToggleCreateJobsInput,SubmitBtnRef } ) => {

    const [seconds, setSeconds] = useState(3)
    
    
        useEffect(() => {
    
            const handleTimer = setInterval(() => {
                
                setSeconds(seconds => {
                    
                    if(seconds <= 0){clearInterval(handleTimer) ;setToggleJobsMessage(false) ;return 0}

                    if(SubmitBtnRef.current){
                        SubmitBtnRef.current.disabled = true
                    }
                    return seconds - 1
                
                }) 
    
            }, 1000);
            
    
            if(seconds == 0){
                if(isJobsSuccessful){setToggleCreateJobsInput(false), setToggleJobsMessage(false)}

                else setToggleCreateJobsInput(true) ; setToggleJobsMessage(false);SubmitBtnRef.current.disabled = false ; window.location.reload()
            }
            
            
    
            return () =>  {clearInterval(handleTimer)}
        
    },[seconds])

    return (
        <div className="new-jobs-message-container container position-fixed bg-white p-3 rounded-2" style={{zIndex : 5000}}>
            
            <div className="message-header">
                {isJobsSuccessful ? <span className="d-flex align-items-top d-sm-flex-column"><i className="fa-regular fa-circle-check text-success fs-4" ></i> Job Opportunify Created! </span> : <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-xmark text-danger fs-4 " ></i> <h4 className="text-danger">Job Opportunity Was Not Creted!</h4></span>}
                
            </div>

            <div className="message-body">

                {isJobsSuccessful ? <span className="d-flex flex-row align-items-center d-sm-flex-column text-success">Redirecting In {seconds} Seconds.</span> : <span className="d-flex flex-row align-items-center d-sm-flex-column text-danger">Window Closes In {seconds} Seconds</span>}
                
            </div>
            
        </div>
    )
}


export default NewJobsMessage