import '../main.css' ; //importing css file

import { useEffect, useState } from "react"; //importing react hooks

const DescMessage = ({ setToggleUploadDesc , setToggleUploadDescMessage, isDescSuccessfull,UploadMessage }) => {

    const [seconds,setSeconds] = useState(3); //state for seconds utill alert message dissapears

    useEffect(() => {
        
        const handleTimer = setInterval(() => {
                    
            setSeconds(seconds => {
                        
                if(seconds <= 0){clearInterval(handleTimer) ;setToggleUploadDescMessage(false) ;return 0};  //if seconds are less than zero it untoggles component

                return seconds - 1; //else triggers countdown from 3 to 0
                    
            }) ;
        
        }, 1000); //countdown happens once in 1000ms (1 sec)
                
        
            if(seconds == 0){
                    
                if(isDescSuccessfull){setToggleUploadDesc(false), setToggleUploadDescMessage(false)} //if description upload is successfull it closes window
    
                else setToggleUploadDesc(true) ; setToggleUploadDescMessage(false); //if description upload failed it does not closes window and lets user know about error
            
            }; //if seconds are 0 if statement triggers
                
                
        
            return () =>  {clearInterval(handleTimer)}; //clearing interval
            
        },[seconds,isDescSuccessfull]); //function mounts based on this variables


    return(
        <div className="desc-message-container  bg-white p-3 border rounded-2 d-flex flex-column">
            
            {isDescSuccessfull ? <span className="fs-5 text-success"><i className="fa-regular fa-circle-check "></i> {UploadMessage}</span> :  <span className="fs-5 text-danger"><i className="fa-regular fa-circle-check "></i> Invalid Input</span>}
            
            <span className="ms-2">{isDescSuccessfull ? <span className="text-success">Redirecting In... {seconds} Seconds.</span> : <span className="text-danger">Window Closes In : {seconds} Seconds.</span> }</span>   

        </div>
    );
};

export default DescMessage ; //exporting component