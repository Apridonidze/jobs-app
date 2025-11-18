import { useState, useEffect } from "react";//importing react hooks

import '../main.css'; //importing css file 

const NewJobsMessage = ( { isJobsSuccessful  ,setToggleJobsMessage, setToggleCreateJobsInput,SubmitBtnRef } ) => {

    const [seconds, setSeconds] = useState(3); //state for seconds to untoggle this component
    
    
        useEffect(() => {
    
            const handleTimer = setInterval(() => {
                
                setSeconds(seconds => {
                    
                    if(seconds <= 0){clearInterval(handleTimer) ;setToggleJobsMessage(false) ;return 0} ; //if seconds are less than zero then this component untoggles and interval stops 

                    if(SubmitBtnRef.current){
                        SubmitBtnRef.current.disabled = true ; //disables create job opportunity button to avoid multiple clickings
                    }
                    return seconds - 1;//else seconds countdown updates by -1
                
                }) 
    
            }, 1000); //interval changes in every 1000 miliseconds (1 sec)
            
    
            if(seconds == 0){
                if(!isJobsSuccessful){setToggleCreateJobsInput(false), setToggleJobsMessage(false)} //if job is not successsfull then it just untoggles input and this comoponent

                else setToggleCreateJobsInput(true) ; setToggleJobsMessage(false); SubmitBtnRef.current.disabled = false ; window.location.reload() //else statemnet reloads page and shows us updated job list
            };
            
            return () =>  {clearInterval(handleTimer)} ; //clears interval
        
    },[seconds]); //function executes on this variable change

    return (
        <div className="new-jobs-message-container container position-fixed bg-white p-3 rounded-2" style={{zIndex : 5000}}>
            
            <div className="message-header">
                {isJobsSuccessful ? <span className="d-flex align-items-top d-sm-flex-column text-success"><i className="fa-regular fa-circle-check text-success fs-4" ></i> Job Opportunity Created! </span> : <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-xmark text-danger fs-4 " ></i> <h4 className="text-danger">Job Opportunity Was Not Creted!</h4></span>}
                
            </div>

            <div className="message-body">

                {isJobsSuccessful ? <span className="d-flex flex-row align-items-center d-sm-flex-column text-success">Redirecting In {seconds} Seconds.</span> : <span className="d-flex flex-row align-items-center d-sm-flex-column text-danger">Window Closes In {seconds} Seconds</span>}
                
            </div>
            
        </div>
    );
};


export default NewJobsMessage; //exporting component