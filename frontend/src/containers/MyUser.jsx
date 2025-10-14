import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


import Footer from "../components/Foooter"
import NavBarHeader from "../navbar/NavBarHeader"
import MyUserSidebar from "./MyUserSidebar"

const MyUser = () => {

    
    const MY_USER_API = 'http://localhost:8080/my-user' //move to .env

    const [user,setUser] = useState(null)
    
    const [cookies, setCookies , removeCookies] = useCookies(['token'])

    useEffect(() => {

        axios
        .get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => {
            const userData = resp.data.data[0]
            setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})
        })
        .catch(err => console.log(err))

    },[])


    //move myuser and myusersidebar.jsx to myuser fodler for more flexibility during development


    return (
        <div className="myuser-container container d-flex flex-column">
            <NavBarHeader user={user} />

            <MyUserSidebar />            

            {user && (
                <>
                <span>Your Name : {user.name}</span> 
                <span>Your Surname : {user.surname}</span>  
                <span>Your Birth Date : {user.birthDate.slice(0, 10)}</span>    
                <span>Your Gender: {user.gender}</span>     
                </>
            )}



            <Footer />
            
            {/* add  user resume file here */}
        </div>
    )
}

export default MyUser