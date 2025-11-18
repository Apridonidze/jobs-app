import { useEffect } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../main.css' 
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

                navigate("/", { replace: true }); // redirect immediately after token is set
            }

        }, 1000);
        

        

        return () =>  {clearInterval(handleTimer)}

    
},[seconds, isSuccessful , navigate, cookies])



    return(
        <div className="sign-message-container d-flex flex-column position-absolute bg-bright bg-white rounded-2 p-2 " style={isSuccessful ? {border : '1px solid #198754'} : {border : '1px solid #dc3545' , zIndex : 1055}}>
            
            <div className="login-message-header d-flex align-items-center">
            
                {isSuccessful ? <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-check text-success fs-4" ></i> <h4 className="text-success">User Created Succesfully!</h4></span> : <span className="d-flex flex-row align-items-center d-sm-flex-column"><i className="fa-regular fa-circle-xmark text-danger fs-4 " ></i> <h4 className="text-danger">User Was Not Created!</h4></span>}
                
            
            </div>

            <span>{isSuccessful ? <span className="text-success">Redirecting In : <b>{seconds}</b> Seconds.</span> : <span className="text-danger">Window Closes In : <b>{seconds}</b> Seconds.</span> }</span>
                
        </div>
    );
};


export default SignMessage;