import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <div className="login-message-container">
            
            {isSuccesful ? <i className="fa-regular fa-circle-check"></i> : <i className="fa-regular fa-circle-xmark"></i>}
           
            <span>{loginMessage.message}</span>

            <span>{isSuccesful ? <span>Redirecting In...</span> : <span>Window Closes In :</span> }{seconds}</span>
            


        </div>
    )
}


export default LoginMessage