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
        <div className="desc-message-container position-fixed top-0 end-0 bg-white">
            
            {isDescSuccessfull ? <i className="fa-regular fa-circle-check"></i> : <i className="fa-regular fa-circle-xmark"></i>}
            <span>{UploadMessage}</span>
            <span>{isDescSuccessfull ? <span>Redirecting In...</span> : <span>Window Closes In :</span> }{seconds}</span>   

        </div>
    )
}


export default DescMessage