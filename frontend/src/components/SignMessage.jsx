import { useEffect, useState } from "react"

const SignMessage = ( {setToggleSigMessage, isSuccessful , signMessage} ) => {


    const [seconds, setSeconds] = useState(3)


    useEffect(() => {

        const handleTimer = setInterval(() => {
            
            setSeconds(seconds => {
                
                if(seconds <= 0){clearInterval(handleTimer) ; setToggleSigMessage(false) ;return 0}
                return seconds - 1
            
            }) 

        }, 1000);

        return () =>  {clearInterval(handleTimer)}

    
},[])


    return(
        <div className="sign-message-container position-absolute bg-bright border border-1 w-50 d-block">
            SignMessage.jsx
            {/* add succes or fail image here based on if isSuccesful is true || false and redirec user to main page after 3 seconds */}
            <span>{signMessage}</span>
            <span>Tab Will Close In : {seconds}s</span>
        </div>
    )
}


export default SignMessage