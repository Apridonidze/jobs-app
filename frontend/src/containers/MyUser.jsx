import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


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

    return (
        <div className="myuser-container">
            {user && user.name}
        </div>
    )
}

export default MyUser