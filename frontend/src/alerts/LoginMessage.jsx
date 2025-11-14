import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../main.css';

const LoginMessage = ( { loginMessage , isSuccesful , setToggleLoginMessage } ) => {
    
    const navigator = useNavigate()
    const [seconds,setSeconds ] = useState(3)

    useEffect(() => {
       

        const timer = setInterval(() => {
        
            setSeconds(seconds => {
                if(seconds <= 0){clearInterval(timer) ;setToggleLoginMessage(false) ;return 0}
                return seconds - 1
        })
        
        }, 1000);

       
        if(seconds == 0){
            
            if(!isSuccesful){return } //add eerror event here 
            
            navigator('/', {replace: true})
        }
        return () => {clearInterval(timer)}
        
    },[seconds,navigator])


    return(
        <div className="login-message-container d-flex flex-column position-absolute bg-bright bg-white rounded-2 p-2 " style={isSuccesful ? {border : '1px solid #198754'} : {border : '1px solid #dc3545'}}>
            
            <div className="login-message-header d-flex align-items-center">
            
                {isSuccesful ? <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-check text-success fs-4" ></i> <h4 className="text-success">User Found!</h4></span> : <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-xmark text-danger fs-4 " ></i> <h4 className="text-danger">User Not Found!</h4></span>}
                
            
            </div>

            <span>{isSuccesful ? <span className="text-success">Redirecting In : <b>{seconds}</b> Seconds.</span> : <span className="text-danger">Window Closes In : <b>{seconds}</b> Seconds.</span> }</span>
            


        </div>
    )
}


export default LoginMessage