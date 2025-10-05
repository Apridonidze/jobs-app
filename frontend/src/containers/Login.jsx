import { useRef, useState } from "react"
import { Link  } from "react-router-dom"

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    
    const handleLogin = () => {

    }

    return(
        <div className="login-container container">
            Login.jsx

            <form onSubmit={handleLogin}>

                <div className="form-floating">
                    <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Login Email" ref={emailRef}/>
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