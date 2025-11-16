import { useEffect, useState } from "react";

const Error = ( { setToggleError } ) => {

    const [seconds,setSeconds] = useState(3)
    
        useEffect(() => {
            
            const handleTimer = setInterval(() => {
                        
                setSeconds(seconds => {
                            
                    if(seconds < 1){clearInterval(handleTimer) ;setToggleError(false) ;return 0};
                    return seconds - 1;
    
                }); //seconds go down from 3 to zero and if seconds === 0 then it untoggles Error component
            
            }, 1000);
                    
            
            return () =>  {clearInterval(handleTimer)}; //cleanup function
                
        },[seconds]);//interval triggers on seconds change


    return(
        <div className="error-message-container d-flex flex-column position-absolute bg-white p-2 rounded-2 text-danger" style={{border : '1px solid #dc3545' , zIndex : 1055}}>
            <h4>Internal Error!</h4>
            <h5>Try Later.</h5>
            <h6>Window Closes In <b>{seconds}</b> Seconds.</h6>
        </div>
    );
};


export default Error; //exporting component