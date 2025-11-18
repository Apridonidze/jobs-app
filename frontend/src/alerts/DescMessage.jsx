import { useEffect, useState } from "react";

const DescMessage = ({ setToggleUploadDesc , setToggleUploadDescMessage, isDescSuccessfull,UploadMessage }) => {

    const [seconds,setSeconds] = useState(3)

    useEffect(() => {
        
        const handleTimer = setInterval(() => {
                    
            setSeconds(seconds => {
                        
                if(seconds <= 0){clearInterval(handleTimer) ;settogg(false) ;return 0}

                return seconds - 1
                    
            }) 
        
        }, 1000);
                
        
            if(seconds == 0){
                    
                if(isDescSuccessfull){setToggleUploadDesc(false), setToggleUploadDescMessage(false)}
    
                else setToggleUploadDesc(true) ; setToggleUploadDescMessage(false)
            
            }
                
                
        
            return () =>  {clearInterval(handleTimer)}
            
        },[seconds,isDescSuccessfull])


    return(
        <div className="desc-message-container position-fixed top-50 end-0 bg-white p-3 border rounded-2 d-flex flex-column">
            
            {isDescSuccessfull ? <span className="fs-5 text-success"><i className="fa-regular fa-circle-check "></i> {UploadMessage}</span> :  <span className="fs-5 text-danger"><i className="fa-regular fa-circle-xmark"></i> {UploadMessage}</span>}
            
            <span className="ms-2">{isDescSuccessfull ? <span className="text-success">Redirecting In... {seconds} Seconds.</span> : <span className="text-danger">Window Closes In : {seconds} Seconds.</span> }</span>   

        </div>
    )
}

export default DescMessage 