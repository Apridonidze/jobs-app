import { useState, useEffect } from "react";

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

                else setToggleCreateJobsInput(true) ; setToggleJobsMessage(false);SubmitBtnRef.current.disabled = false
            }
            
            
    
            return () =>  {clearInterval(handleTimer)}
        
    },[seconds])

    return (
        <div className="new-jobs-message-container container position-fixed bg-white top-0">
            {isJobsSuccessful}
            {jobsMessage}
            {seconds}
        </div>
    )
}


export default NewJobsMessage