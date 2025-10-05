import { useState } from "react"
import { Link  } from "react-router-dom"

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    

    const handleLogin = () => {

    }

    return(
        <div className="login-container">
            Login.jsx

            <form onSubmit={handleLogin}>

                <div className="form-floating">
                    <input className="form-control" type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Login Email"/>
                    <label htmlFor="email">Enter Your Login Email</label>
                </div>

                <div className="form-floating">
                    <input className="form-control" type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter Your Password"/>
                    <label htmlFor="password">Enter Your Password</label>
                </div>

                <input type="submit" value="Login" />


            </form>


            <Link to='/sign'>Dont Have An Account?</Link>

        </div>
    )
}


export default Login