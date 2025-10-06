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
            if(isSuccesful){navigator('/', {replace: true})}
            else return
        }
        return () => {clearInterval(timer)}
        
    },[seconds,navigator])

    return(
        <div className="login-message-container">
            
            {loginMessage}
            {seconds}

            {/**add redirecting text if success  else tab will close in secodns*/}

        </div>
    )
}


export default LoginMessage