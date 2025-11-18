import { useNavigate } from "react-router-dom";//importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

import '../main.css'; //importing css file

const LoginMessage = ( { isSuccesful , setToggleLoginMessage } ) => {
    
    const navigator = useNavigate(); //navigator to navigate user through pages
    const [seconds,setSeconds ] = useState(3); //state for login message toggle in seconds

    useEffect(() => {
       

        const timer = setInterval(() => {
        
            setSeconds(seconds => {
                if(seconds <= 0){clearInterval(timer) ;setToggleLoginMessage(false) ;return 0}; //checks if seconds === 0 and clears interval
                return seconds - 1; //else executes seconds countdwon
        });
        
        }, 1000);//interval execcutes once in 1000 miliseconds

       
        if(seconds == 0){//if seconds === 0 this logic executes
            
            if(!isSuccesful) return ; //if login is not successfull function does nothing
            
            navigator('/', {replace: true}); //else if login is susccessfull function navigates user to main page
        }

        return () => {clearInterval(timer)}; //clears interval
        
    },[seconds,navigator]); //function mounts basedon this variables change


    return(
        <div className="login-message-container d-flex flex-column position-absolute bg-bright bg-white rounded-2 p-2 " style={isSuccesful ? {border : '1px solid #198754'} : {border : '1px solid #dc3545'}}>
            
            <div className="login-message-header d-flex align-items-center">
            
                {isSuccesful ? <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-check text-success fs-4" ></i> <h4 className="text-success">User Found!</h4></span> : <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-xmark text-danger fs-4 " ></i> <h4 className="text-danger">User Not Found!</h4></span>}
                
            
            </div>

            <span>{isSuccesful ? <span className="text-success">Redirecting In : <b>{seconds}</b> Seconds.</span> : <span className="text-danger">Window Closes In : <b>{seconds}</b> Seconds.</span> }</span>
            


        </div>
    );
};

export default LoginMessage;//exporting component