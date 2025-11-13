import { useEffect, useState } from "react";

const Error = ( { setToggleError } ) => {

    const [seconds,setSeconds] = useState(3)
    
        useEffect(() => {
            
            const handleTimer = setInterval(() => {
                        
                setSeconds(seconds => {
                            
                    if(seconds < 1){clearInterval(handleTimer) ;setToggleError(false) ;return 0}
                    return seconds - 1
    
                }) 

            
            }, 1000);
                    
            
                return () =>  {clearInterval(handleTimer)}
                
        },[seconds])


    return(
        <div className="error-message-container position-fixed bg-white border rounded-2 top-50 end-0 p-2">
            <h4>Internal Error!</h4>
            <h5>Try Later.</h5>
            <h6>Window Closes In {seconds} Second</h6>
        </div>
    )
};


export default Error