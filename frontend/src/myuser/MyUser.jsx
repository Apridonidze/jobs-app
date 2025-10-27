import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


import Footer from "../components/Foooter"
import NavBarHeader from "../navbar/NavBarHeader"
import MyUserSidebar from "./MyUserSidebar"
import ProfileMessage from "../alerts/ProfileMessage"

const MyUser = () => {

    
    const MY_USER_API = 'http://localhost:8080/user/my-user' //move to .env
    const IS_PROFILE_FINISHED_URL = 'http://localhost:8080/is-profile-finished' //move to .env


    const [user,setUser] = useState(null)
    const [isProfileFinished , setIsProfileFinished] = useState(null)

    
    const [cookies, setCookies , removeCookies] = useCookies(['token'])

    useEffect(() => {

        const FetchMyUser = async () => {
            try{

             await Promise.all([
                axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {const userData = resp.data.data[0] ; setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})
}),
                axios.get(IS_PROFILE_FINISHED_URL , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(resp => setIsProfileFinished(resp.data))
            ])

            }catch(err){
                console.log(err)
            }
        } 

        FetchMyUser()

    },[])

    return (
        <div className="myuser-container container d-flex flex-column justify-content-between min-vh-100">
            <NavBarHeader user={user} />
           
            {isProfileFinished != null && !isProfileFinished && <ProfileMessage />}
            
            <div className="user-body d-flex">
                <MyUserSidebar user={user}/>

                <div className="user-main d-flex flex-column">
                    {user && (
                        <>
                            <span>Your Name : {user.name}</span> 
                            <span>Your Surname : {user.surname}</span>  
                            <span>Your Birth Date : {user.birthDate.slice(0, 10)}</span>    
                            <span>Your Gender: {user.gender}</span>     
                </>
            )}
                </div>
            </div> {/** make components for it */}



            <Footer />
            
        </div>
    )
}


export default MyUser