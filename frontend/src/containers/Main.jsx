import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import axios from "axios"

const Main = () => {

    const MY_USER_API = 'http://localhost:8080/my-user' //move to .env

    const [cookies, setCookies , removeCookies] = useCookies(['token'])

    const [user,setUser] = useState({})

    useEffect(() => {

        axios
        .get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => {
            const userData = resp.data.data[0]
            setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})
        })
        .catch(err => console.log(err))

    },[])


    return(
        <div className="main-container">

            {/* add navigation here */}
            {/* add what you want to do  : create statement to get recruiter || create statemen to get employeees (based on roles ) or find jobs || find employees*/}
            {/**statements here */}
            {/**footer here with contact and copyrights and etc. */}
            Main.jsx
            {user.role}
        </div>
    )
}


//add titles to this page
export default Main