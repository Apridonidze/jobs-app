import { useRef,useState  } from "react"

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Sign = () => {

    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [countryCode,setCountryCode] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender,setGender] = useState('')
    const [resumeFile,setResumeFile] = useState('')

    const [nameErr, setNameErr] = useState('')
    const [surnameErr, setSurnameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [phoneErr, setPhoneErr] = useState('')
    const [birthDateErr,setBirthDateErr] = useState('')
    const [genderErr, setGenderErr] = useState('')
    const [resumeErr, setResumeErr] = useState('')

    const nameRef = useRef(null)
    const surnameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const phoneNumberRef = useRef(null)
    const birthDateRef = useRef(null)
    const genderRef = useRef(null)
    const resumeRef = useRef(null)

    const SubmitSign = (e) => {

        e.preventDefault()

        let data = {} //data to send to server 

        let isValid
        
        const NumberRegex = /\d/
        const regexContainsSpecial = /[^\w\s]/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(name.trim() == '' || name.trim() == null || name.trim() == undefined){isValid = false ; setNameErr(`This Field Can't Be Empty`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(name.trim().length <= 1){isValid = false; setNameErr('Your Name Length Should Be Atleast 2 Letters Long'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else {isValid = true; setNameErr('') ;nameRef.current.classList.add('is-valid') ;nameRef.current.classList.remove('is-invalid'); data = {...data,name:name}}

        if(surname.trim() == '' || surname.trim() == null || surname.trim() == undefined){isValid = false ; setSurnameErr(`This Field Can't Be Empty`); surnameRef.current.classList.add('is-invalid'); surnameRef.current.classList.remove('is-valid')}
        else if (surname.trim().length <= 2) {isValid = false ; setSurnameErr('Your Surname Length Should Be Atleast 3 Letters Long'); surnameRef.current.classList.add('is-invalid');surnameRef.current.classList.remove('is-valid') }
        else {isValid = true ; setSurnameErr(''); surnameRef.current.classList.add('is-valid'); surnameRef.current.classList.remove('is-invalid'); data = {...data, surname: surname}}

        if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordErr(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordErr('Your Password Should Be 8 Letters Long'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordErr('Your Password Should Contain Numbers');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordErr('Your Password Should Contain Special Characters');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordErr('') ; passwordRef.current.classList.remove('is-invalid'); passwordRef.current.classList.add('is-valid'); data = {...data, password : password}}

        if(email.trim() == '' || password.trim() == email || password.trim() == email){isValid = false; setEmailErr(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailErr('Insert Valid Email!')}
        else {emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailErr(''); data = {...data, email : email}}


    }


    return(
        <div className="sign-container container">
            Sign.jsx

             

            <form onSubmit={SubmitSign}>

                <div className="form-floating">

                    <input type="text" className="form-control" id="nameID" onChange={(e) => setName(e.target.value)} value={name} ref={nameRef} placeholder="Your Name..."/>
                    <label htmlFor="nameID">Your Name...</label>
                    <span>{nameErr}</span>

                </div>

                <div className="form-floating">
                    
                    <input type="text" className="form-control" id="surnameID" onChange={(e) => setSurname(e.target.value)} value={surname} ref={surnameRef} placeholder="Your Surname..."/>
                    <label htmlFor="surnameID">Your Surname...</label>
                    <span>{surnameErr}</span>
                    
                </div>

                <div className="form-floating">
                    
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} ref={passwordRef} placeholder="Your Password..."/>
                    <label htmlFor="passwordID">Your Password...</label>
                    <span>{passwordErr}</span>

                </div>

                <div className="form-floating">
                    
                    <input type="text" className="form-control" id="emailID" onChange={(e) => setEmail(e.target.value)} value={email} ref={emailRef} placeholder="Your Email..."/>
                    <label htmlFor="emailID">Your Email...</label>
                    
                </div>

                <div className="form">
                    <label htmlFor="phoneID" >Your Phone Number...</label>
                    
                        <div className="input-group">
                            
                            <PhoneInput country="us" value={countryCode} onChange={setCountryCode} enableSearch inputStyle={{width: '100px'}} />
                            <input type="text" className="form-control"  onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} ref={phoneNumberRef} placeholder="Your Phone Nubmer..."/>
                    
                        </div>

                </div>

                <div className="form-floating ">
                    
                    <input type="date"  className="form-control" onChange={(e) => setBirthDate(e.target.value)} value={birthDate} ref={birthDateRef} placeholder="Your Phone Nubmer..."/>
                    <label htmlFor="phoneID">Your Birth Date...</label>
                    
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
                    <div className="col"><input type="reset" className="btn btn-danger" value='reset form'/></div>{/* add reset function */}
                </div>

            </form>

        </div>
    )
}


export default Sign