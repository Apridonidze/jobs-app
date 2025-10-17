import { useEffect, useState } from "react";

const DescMessage = ({ setToggleUploadDesc , setToggleUploadDescMessage, isDescSuccessfull }) => {

    const [seconds,setSeconds] = useState(3)

    useEffect(() => {
        
        const handleTimer = setInterval(() => {
                    
            setSeconds(seconds => {
                        
            if(seconds <= 0){clearInterval(handleTimer) ;settogg(false) ;return 0}
               
                return seconds - 1
                    
                }) 
        
                }, 1000);
                
        
            if(seconds == 0){
                    
                if(!isDescSuccessfull){setToggleUploadDesc(false), setToggleUploadDescMessage(false)}
    
                else setToggleUploadDesc(true) ; setToggleUploadDescMessage(false)
            
            }
                
                
        
            return () =>  {clearInterval(handleTimer)}
            
        },[seconds,isDescSuccessfull])


    return(
        <div className="desc-message-container position-fixed top-0 end-0 bg-white">
            <span>{/**adde description message here */}</span>
            <span>error </span>
            {seconds}
            
        </div>
    )
}


export default DescMessage