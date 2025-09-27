import { useRef } from "react"
import { useState } from "react"

const Sign = () => {

    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [gender,setGender] = useState('')
    const [resumeFile,setResumeFile] = useState('')

    const nameRef = useRef(null)
    const surnameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const phoneNumberRef = useRef(null)
    const genderRef = useRef(null)
    const resumeRef = useRef(null)

    const SubmitSign = (e) => {

        e.preventDefault()

    }

    return(
        <div className="sign-container container">
            Sign.jsx

            <form onSubmit={SubmitSign}>

                <div className="form-floating">

                    <input type="text" className="form-control" id="nameID" onChange={(e) => setName(e.target.value)} value={name} ref={nameRef} placeholder="Your Name..."/>
                    <label htmlFor="nameID">Your Name...</label>

                </div>

                <div className="form-floating">
                    
                    <input type="text" className="form-control" id="surnameID" onChange={(e) => setSurname(e.target.value)} value={surname} ref={surnameRef} placeholder="Your Surname..."/>
                    <label htmlFor="surnameID">Your Surname...</label>
                    
                </div>

                <div className="form-floating">
                    
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} ref={passwordRef} placeholder="Your Password..."/>
                    <label htmlFor="passwordID">Your Password...</label>

                </div>

                <div className="form-floating">
                    
                    <input type="text" className="form-control" id="emailID" onChange={(e) => setEmail(e.target.value)} value={email} ref={emailRef} placeholder="Your Email..."/>
                    <label htmlFor="emailID">Your Email...</label>
                    
                </div>

                <div className="form-floating ">
                    
                    <input type="text"  className="form-control" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} ref={phoneNumberRef} placeholder="Your Phone Nubmer..."/>
                    <label htmlFor="phoneID">Your Phone Number...</label>
                    
                </div>

                <div className="form d-flex">

                    <label htmlFor="GenderID">I Am : </label>

                    <div className="radio-forms">
                        
                        <input type="radio" className="form-check-input" id="genderID" name="gender" onChange={(e) => setGender(e.target.value)} value='male' ref={genderRef}/>
                        <label htmlFor="genderID" >Male</label>
                    
                    </div>

                    <div className="radio-forms">
                    
                        <input type="radio" className="form-check-input" id="genderID" name="gender" onChange={(e) => setGender(e.target.value)}  value='female' ref={genderRef}/>
                        <label htmlFor="genderID">Female</label>
                    
                    </div>

                </div>

                <div className="form">
                    
                    <input type="file" className="form-control" id="resumeID" onChange={(e) => setResumeFile(e.target.value)} value={resumeFile} ref={resumeRef}/>
                    <label htmlFor="resumeID"></label>
                    
                </div>
                
                <div className="row row-cols-sm-2">
                    <div className="col"><input type="submit" className="btn btn-success" value='Create New Account'/></div>
                    <div className="col"><input type="reset" className="btn btn-danger" value='reset'/></div>
                </div>

            </form>

        </div>
    )
}


export default Sign