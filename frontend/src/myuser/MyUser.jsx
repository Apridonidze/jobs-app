import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import DescMessage from '../alerts/DescMessage'
import UploadDesc from "../components/UploadDesc"


import Footer from "../components/Foooter"
import NavBarHeader from "../navbar/NavBarHeader"
import MyUserSidebar from "./MyUserSidebar"
import ProfileMessage from "../alerts/ProfileMessage"
import MyUserData from "./MyUserData"
import { useNavigate } from "react-router-dom"

const MyUser = () => {

    const navigator = useNavigate()

    const MY_USER_API = 'http://localhost:8080/user/my-user' //move to .env
    const IS_PROFILE_FINISHED_URL = 'http://localhost:8080/is-profile-finished' //move to .env
    const USER_DESC_URL = 'http://localhost:8080/desc/my-desc' //move to .env

    const [user,setUser] = useState(null)
    const [isProfileFinished , setIsProfileFinished] = useState(null)

    const [toggleUploadDesc,setToggleUploadDesc] = useState(false)


    const [descValue,setDescValue] = useState('')
    const [toggleUploadDescMessage, setToggleUploadDescMessage] = useState(false)
    const [UploadMessage,setUploadMessage] = useState('')
    const [isDescSuccessfull, setIsDescSuccessfull] = useState(null)


    
    const [cookies , removeCookies] = useCookies(['token'])

    useEffect(() => {

        const FetchMyUser = async () => {
            try{

             await Promise.all([
                axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {const userData = resp.data ; setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})}),
                axios.get(IS_PROFILE_FINISHED_URL , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(resp => setIsProfileFinished(resp.data)),
                axios.get(USER_DESC_URL , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => setDescValue(resp.data)), 
            ])

            }catch(err){
                console.log(err)
            }
        } 

        FetchMyUser()

    },[])

    return (
        <div className="myuser-container  container d-flex flex-column justify-content-between min-vh-100">
            <NavBarHeader user={user} />
           
            {isProfileFinished != null && !isProfileFinished && <ProfileMessage />}

            {toggleUploadDesc && 

                <> 
                    <div className="upload-desc-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadDesc(false)}></div> 
                    <UploadDesc setToggleUploadDescMessage={setToggleUploadDescMessage} setIsDescSuccessfull={setIsDescSuccessfull} setUploadMessage={setUploadMessage}/> 
                    {toggleUploadDescMessage && 
                    <DescMessage setToggleUploadDesc={setToggleUploadDesc} setToggleUploadDescMessage={setToggleUploadDescMessage} isDescSuccessfull={isDescSuccessfull} UploadMessage={UploadMessage} /> }
                </>

            }
            
            <div className="user-body row row-cols-1 row-cols-md-2">
                <MyUserSidebar user={user}/>

                {user && <MyUserData user={user} setToggleUploadDesc={setToggleUploadDesc} descValue={descValue}/>}
                
            </div> 

            <div className="user-footer d-flex">
                
                <button className="btn btn-danger" onClick={() => {removeCookies('token'), navigator('/authentication' , {replace : true})}}>Log Out</button>
            
            </div>



            <Footer />
            
        </div>
    )
}


export default MyUser