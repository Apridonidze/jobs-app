import axios from "axios"
import { useEffect, useRef, useState } from "react"
import {  Link  } from "react-router-dom"
import { useCookies } from "react-cookie"

import LoginMessage from "../alerts/LoginMessage"

const Login = () => {

    const LOGIN_API_URL = 'http://localhost:8080/login' //move to .env file
    const [cookies, setCookies,removeCookies] = useCookies(['token'])
    

    const [toggleLoginMessage , setToggleLoginMessage] = useState(false)
    const [isSuccesful, setIsSuccesfull] = useState(null)
    const [loginMessage, setLoginMessage] = useState('')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')

    const [showPassword,setShowPassword] = useState(false)
    const [passwordType,setPasswordType] = useState('password')


      const handleLogin = (e) => {
    
        e.preventDefault()

        let data = {}
        let isValid
        
        const NumberRegex = /\d/
        const regexContainsSpecial = /[^\w\s]/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(email.trim() == '' || email.trim() == undefined || email.trim() == null){isValid = false; setEmailError(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailError('Insert Valid Email!')}
        else {isValid = true ; setEmailError(''); data = {...data, email : email}}


        if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordError(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordError('Invalid Password Input'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordError('Invalid Password Input');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordError('Invalid Password Input');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordError('') ; data = {...data, password : password}}

        if(isValid){
            axios
            .post(LOGIN_API_URL, data)
            .then(resp => {

                console.log(resp.data) //remove in future
                setCookies('token', resp.data.token, { path: '/',maxAge : 60 * 60 * 24 * 30,secure : true,sameSite : 'strict'})
                setLoginMessage(resp.data.message)
                setIsSuccesfull(true)
                setToggleLoginMessage(true)
            })
            .catch(err => {
                console.log(err.response.data) //remove in future
                setLoginMessage(err.response.data.error)
                setIsSuccesfull(false)
                setToggleLoginMessage(true)

                if(loginMessage === 'Invalid Password'){passwordRef.current.classList.remove('is-valid'); passwordRef.current.classList.add('is-invalid')}
                if(loginMessage === 'User Not Found'){emailRef.current.classList.remove('is-valid'); emailRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid'); passwordRef.current.classList.add('is-invalid')}

    
            })
        }

  

    }


    
    useEffect(() => {handleLogin},[])

  


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

                <div className="form">

                    <div className="input-group form-floating">
                        
                        <input className="form-control" type={passwordType} name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Your Password" ref={passwordRef}/>
                        <button type="button" onClick={() => {setShowPassword(!showPassword); setPasswordType(passwordType => {if(showPassword == false){return 'text'} else return 'password'})}}>{showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}</button>
                        <label htmlFor="password">Enter Your Password</label>
                    
                    </div>

                    <span>{passwordError}</span>

                </div>

                <input type="submit" className="btn btn-success" value="Login" />

            </form>


            <Link to='/sign'>Don't Have An Account?</Link>

        </div>
    )
}


//add titles to this page
export default Login