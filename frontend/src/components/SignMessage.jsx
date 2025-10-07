import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

const SignMessage = ( {setToggleSigMessage, isSuccessful , signMessage} ) => {


    const navigator = useNavigate()
    const [seconds, setSeconds] = useState(3)


    useEffect(() => {

        const handleTimer = setInterval(() => {
            
            setSeconds(seconds => {
                
                if(seconds <= 0){clearInterval(handleTimer) ;setToggleSigMessage(false) ;return 0}
                return seconds - 1
            
            }) 

        }, 1000);
        

        if(seconds == 0){
            if(isSuccessful){navigator('/', {replace: true})}
            else return
        }
        
        

        return () =>  {clearInterval(handleTimer)}

    
},[seconds,navigator])


    return(
        <div className="sign-message-container position-absolute bg-bright border border-1 w-50 d-block">
            SignMessage.jsx
            {/* add succes or fail image here based on if isSuccesful is true || false and redirec user to main page after 3 seconds */}
            <span>{signMessage}</span>
            
            <span>{isSuccessful ? <span>Redirecting In...</span> : <span>Window Closes In :</span> }{seconds}</span>
            

            
            {/**add redirecting text if success  else tab will close in secodns*/}

        </div>
    )
}


export default SignMessage