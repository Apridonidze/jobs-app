import { useEffect } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SignMessage = ( {setToggleSigMessage, isSuccessful , signMessage, setSeconds, seconds } ) => {

    const navigate = useNavigate()
    const [cookies] = useCookies(['token'])


        useEffect(() => {

        const handleTimer = setInterval(() => {
            
            setSeconds(seconds => {
                
                if(seconds <= 0){clearInterval(handleTimer) ;setToggleSigMessage(false) ;return 0}
                return seconds - 1
            
            }) 

              
            if (seconds === 0  && cookies.token) {
                console.log(cookies.token)
    navigate("/main", { replace: true }); // redirect immediately after token is set
  }

        }, 1000);
        

        

        return () =>  {clearInterval(handleTimer)}

    
},[seconds, isSuccessful , navigate, cookies])



    return(
        <div className="sign-message-container position-absolute bg-bright border border-1 w-50 d-block">
            SignMessage.jsx

            {isSuccessful ? <i className="fa-regular fa-circle-check"></i> : <i className="fa-regular fa-circle-xmark"></i>}
            <span>{signMessage}</span>
            <span>{isSuccessful ? <span>Redirecting In...</span> : <span>Window Closes In :</span> }{seconds}</span>          
        </div>
    )
}


export default SignMessage