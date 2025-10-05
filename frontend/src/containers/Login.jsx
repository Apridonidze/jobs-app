import axios from "axios"
import { useRef, useState } from "react"
import {  Link  } from "react-router-dom"
import { useCookies } from "react-cookie"
import LoginMessage from "../components/LoginMessage"

const Login = () => {

    const LOGIN_API_URL = 'http://localhost:8080/login'


    const [toggleLoginMessage , setToggleLoginMessage] = useState(false)
    const [isSuccesful, setIsSuccesfull] = useState(null)
    const [loginMessage, setLoginMessage] = useState('')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')

    const [cookies, setCookies,removeCookies] = useCookies(['token'])

    
    const handleLogin = (e) => {
    
        e.preventDefault()

        let data = {}
        let isValid
        
        const NumberRegex = /\d/
        const regexContainsSpecial = /[^\w\s]/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(email.trim() == '' || password.trim() == email || password.trim() == email){isValid = false; setEmailError(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailError('Insert Valid Email!')}
        else {isValid = true ;emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailError(''); data = {...data, email : email}}


         if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordError(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordError('Your Password Should Be 8 Letters Long'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordError('Your Password Should Contain Numbers');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordError('Your Password Should Contain Special Characters');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordError('') ; passwordRef.current.classList.remove('is-invalid'); passwordRef.current.classList.add('is-valid'); data = {...data, password : password}}
 //change up validatio forms 

        if(isValid){
            axios
            .post(LOGIN_API_URL, data)
            .then(resp => {

                console.log(resp) //remove in future
                setCookies('token', resp.data.token, { path: '/',maxAge : 60 * 60 * 24 * 30,secure : true,sameSite : 'strict'})
                setLoginMessage(resp.data.message)
                setIsSuccesfull(true)
                setToggleLoginMessage(true)
//add styling to inputs based on if inputs are correct or not 
            })
            .catch(err => {
                console.log(err) //remove in future
                setLoginMessage(err.response.data.error)
                setIsSuccesfull(false)
                setToggleLoginMessage(true)

            })
        }


    }



    return(
        <div className="login-container container">
            Login.jsx
            {toggleLoginMessage && <LoginMessage loginMessage={loginMessage} isSuccesful={isSuccesful} setToggleLoginMessage={setToggleLoginMessage} />}
            


            <form onSubmit={handleLogin}>

                <div className="form-floating">
                    <input className="form-control" type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Login Email" ref={emailRef}/>
                    <label htmlFor="email">Enter Your Login Email</label>
                    <span>{emailError}</span>
                </div>

                <div className="form-floating">
                    <input className="form-control" type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Your Password" ref={passwordRef}/>
                    <label htmlFor="password">Enter Your Password</label>

                    <span>{passwordError}</span>

                </div>

                <input type="submit" className="btn btn-success" value="Login" />


            </form>


            <Link to='/sign'>Don't Have An Account?</Link>

        </div>
    )
}


export default Login