import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRef,useState  } from "react"
import { Link } from 'react-router-dom'

import CountryCode from "../components/CountryCode"
import SignMessage from '../components/SignMessage';


const Sign = () => {

    const SIGN_PORT = 'http://localhost:8080/sign' // move to .env file
    
    const [cookies, setCookies , removeCookies] = useCookies(['token'])

    const [isSuccessful ,setIsSuccessful] = useState(false)
    const [toggleSigMessage,setToggleSigMessage]= useState(false)
    
    const [showPassword, setShowPassword] = useState(false)
    const [passwordType,setPasswordType] = useState('password')

    const [role,setRole] = useState('')
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [countryCode,setCountryCode] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender,setGender] = useState('')

    const [roleErr, setRoleErr] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [surnameErr, setSurnameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [countryCodeErr, setCountryCodeErr] = useState('')
    const [phoneErr, setPhoneErr] = useState('')
    const [birthDateErr,setBirthDateErr] = useState('')
    const [genderErr, setGenderErr] = useState('')
    const [signMessage, setSignMessage] = useState('')

    const roleRef = useRef(null)
    const nameRef = useRef(null)
    const surnameRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRef = useRef(null)
    const countryCodeRef = useRef(null)
    const phoneNumberRef = useRef(null)
    const birthDateRef = useRef(null)
    const genderRef = useRef(null)


    const  SubmitSign = async (e) => {

        e.preventDefault()

        let isValid
        let data = {} //data to send to server 


        const currentDate = new Date()
        
        const NumberRegex = /\d/
        const regexContainsSpecial = /[^\w\s]/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(role === 'blank' || role === ''){isValid = false; setRoleErr(`This Field Can't Be Empty`); roleRef.current.classList.add('is-invalid');roleRef.current.classList.remove('is-valid') }
        else{isValid = true; setRoleErr(``); roleRef.current.classList.add('is-valid');roleRef.current.classList.remove('is-invalid'); data = {...data, role: role} }

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
        else {isValid = true ;emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailErr(''); data = {...data, email : email}}

        if(countryCode == 'None' || countryCode.trim() == '') {isValid = false ;setCountryCodeErr('Select Your Country Code') ; countryCodeRef.current.classList.add('is-invalid'), countryCodeRef.current.classList.remove('is-valid'); phoneNumberRef.current.classList.add('is-invalid'); phoneNumberRef.current.classList.remove('is-valid')}
        else if (phoneNumber.trim().length <= 8){isValid = false ; setPhoneErr('Your Phone Number Length Should Be Atleast 8 Numbers Length');isValid = false;phoneNumberRef.current.classList.add('is-invalid'), phoneNumberRef.current.classList.remove('is-valid'); countryCodeRef.current.classList.add('is-invalid'), countryCodeRef.current.classList.remove('is-valid') }
        else if (phoneNumber.trim() == ''){isValid = false ; setPhoneErr(`This Field Can't Be Empty`); isValid = false; phoneNumberRef.current.classList.add('is-invalid'), phoneNumberRef.current.classList.remove('is-valid'); countryCodeRef.current.classList.add('is-invalid'), countryCodeRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(phoneNumber) === false){isValid = false ; setPhoneErr('Only Numbers Allowed'); isValid = false; phoneNumberRef.current.classList.add('is-invalid'), phoneNumberRef.current.classList.remove('is-valid')}
        else {isValid = true; setPhoneErr(''); setCountryCodeErr(''); countryCodeRef.current.classList.add('is-valid'), countryCodeRef.current.classList.remove('is-invalid'); phoneNumberRef.current.classList.add('is-valid'), phoneNumberRef.current.classList.remove('is-invalid'); data = {...data , phoneNumber : `${countryCode.split(' ')[0]} ${phoneNumber}`}}
    
        if(birthDate.trim() == '' || birthDate == null ){isValid = false; birthDateRef.current.classList.add('is-invalid') ; birthDateRef.current.classList.remove('is-valid'); setBirthDateErr(`This Field Can't Be Empty`)}
        else if (currentDate.getFullYear() -  birthDate.slice(0, 4) <= 17){isValid = false; birthDateRef.current.classList.add('is-invalid') ; birthDateRef.current.classList.remove('is-valid'); setBirthDateErr(`Your Age Should Be Over 18 To Use This App`)}
        else {isValid = true; birthDateRef.current.classList.add('is-valid') ; birthDateRef.current.classList.remove('is-invalid'); setBirthDateErr(``); data = {...data, birthDate : birthDate}}

        if(gender.trim() == '' || gender == null || gender.trim() == undefined){isValid = false ; genderRef.current.classList.add('border-danger') ; genderRef.current.classList.remove('border-success')}
        else { isValid = true ; genderRef.current.classList.add('border-success') ; genderRef.current.classList.remove('border-danger'); data = {...data, gender : gender}}
        
        


        if(isValid){
            axios
                .post(SIGN_PORT, {data})
                .then(res => {
                    const respToken = res.data.token; //save in onlyHttp-cookie
                    setCookies('token', respToken, {
                        path: '/',
                        maxAge : 60 * 60 * 24 * 30,
                        secure : true,
                        sameSite : 'strict'
                    })

                    setSignMessage([res.data.message])
                    setIsSuccessful(true)

                    setToggleSigMessage(true)

                    

                }) 
                .catch(err => {
                    setSignMessage(err.response.data.error)
                    setIsSuccessful(false)

                    
                    setToggleSigMessage(true)
                }) 
        } 

        
        }

    const handleReset = () => {

    setRole('')
    setName('')
    setSurname('')
    setPassword('')
    setEmail('')
    setCountryCode('')
    setPhoneNumber('')
    setBirthDate('')
    setGender('')
    setResumeFile('')

    setRoleErr('')
    setNameErr('')
    setSurnameErr('')
    setPasswordErr('')
    setEmailErr('')
    setCountryCodeErr('')
    setPhoneErr('')
    setBirthDateErr('')
    setGenderErr('')
    setResumeErr('')
    setResumeInfo('')

    roleRef.current.classList.remove('is-invalid')
    roleRef.current.classList.remove('is-valid')
    
    nameRef.current.classList.remove('is-invalid')
    nameRef.current.classList.remove('is-valid')
    
    surnameRef.current.classList.remove('is-invalid')
    surnameRef.current.classList.remove('is-valid')
    
    passwordRef.current.classList.remove('is-invalid')
    passwordRef.current.classList.remove('is-valid')
    
    emailRef.current.classList.remove('is-invalid')
    emailRef.current.classList.remove('is-valid')
    
    countryCodeRef.current.classList.remove('is-invalid')
    countryCodeRef.current.classList.remove('is-valid')
    
    phoneNumberRef.current.classList.remove('is-invalid')
    phoneNumberRef.current.classList.remove('is-valid')
    
    birthDateRef.current.classList.remove('is-invalid')
    birthDateRef.current.classList.remove('is-valid')
    
    genderRef.current.classList.remove('is-invalid')
    genderRef.current.classList.remove('is-valid')

    }


    return(
        <div className="sign-container container text-center">
            
            <h1>Sign-Up Page</h1>
            
            {toggleSigMessage && <SignMessage setToggleSigMessage={setToggleSigMessage} isSuccessful={isSuccessful} signMessage={signMessage} /> }

            <form onSubmit={SubmitSign}>
                
                <div className="form mb-4">

                    <select className='form-control' ref={roleRef} onChange={(e) => setRole(e.target.value)}>
                        <option value="blank">I Am a...</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="employee">Employee</option>
                    </select>
                    <span>{roleErr}</span>

                </div>


                <div className="form-floating mb-4">

                    <input type="text" className="form-control" id="nameID" onChange={(e) => setName(e.target.value)} value={name} ref={nameRef} placeholder="Your Name..."/>
                    <label htmlFor="nameID">Your Name...</label>
                    <span>{nameErr}</span>

                </div>

                <div className="form-floating mb-4">
                    
                    <input type="text" className="form-control" id="surnameID" onChange={(e) => setSurname(e.target.value)} value={surname} ref={surnameRef} placeholder="Your Surname..."/>
                    <label htmlFor="surnameID">Your Surname...</label>
                    <span className="text-danger">{surnameErr}</span>
                    
                </div>

                <div className="form mb-4">
                    
                    <div className="input-group form-floating">
                    
                        <input type={passwordType} className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} ref={passwordRef} placeholder="Your Password..."/>
                        <button type="button" onClick={() => {setShowPassword(!showPassword); setPasswordType(passwordType => {if(showPassword == false){return 'text'} else return 'password'})}}>{showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}</button>
                        <label htmlFor="passwordID">Your Password...</label>

                    </div>
                    
                    <span className="text-danger">{passwordErr}</span>

                </div>

                <div className="form-floating mb-4">
                    
                    <input type="text" className="form-control" id="emailID" onChange={(e) => setEmail(e.target.value)} value={email} ref={emailRef} placeholder="Your Email..."/>
                    <label htmlFor="emailID">Your Email...</label>
                    <span className="text-danger">{emailErr}</span>
                    
                </div>

                <div className="form mb-4">


                    <div className="input-group">
                        
                        <CountryCode setCountryCode={setCountryCode} countryCodeRef={countryCodeRef}/>
                        <input type="text" className="form-control w-75"  onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} ref={phoneNumberRef} placeholder="Your Phone Nubmer..."/>

                    </div>

                    <span className="text-danger">{phoneErr}</span>
                    <span className="text-danger">{countryCodeErr}</span>

                </div>

                <div className="form-floating mb-4">
                    
                    <input type="date"  className="form-control" onChange={(e) => setBirthDate(e.target.value)} value={birthDate} ref={birthDateRef} placeholder="Your Phone Nubmer..."/>
                    <label htmlFor="phoneID">Your Birth Date...</label>
                    <span className="text-danger">{birthDateErr}</span>
                    
                </div>

                <div className="form d-flex border mb-4" ref={genderRef}>

                    <label htmlFor="GenderID">I Am : </label>

                    <div className="radio-forms">
                        
                        <input type="radio" className="form-check-input" id="genderID" name="gender" onChange={(e) => setGender(e.target.value)} value='male' />
                        <label htmlFor="genderID" >Male</label>
                    
                    </div>

                    <div className="radio-forms">
                    
                        <input type="radio" className="form-check-input" id="genderID" name="gender" onChange={(e) => setGender(e.target.value)}  value='female' />
                        <label htmlFor="genderID">Female</label>
                    
                    </div>

                    <span className="text-danger">{genderErr}</span>

                </div>

               
                <div className="row row-cols-sm-2 mb-4">
                    <div className="col"><input type="submit" className="btn btn-success" value='Create New Account'/></div>
                    <div className="col"><button className="btn btn-danger" onClick={handleReset} >Reset Form</button></div>
                </div>

            </form>

            <div className="login container text-center my-5">
                <Link to='/login'>Already Have An Account?</Link >
            </div>

        </div>
    )
}

//add titles to this page

export default Sign