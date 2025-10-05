import { useCookies } from "react-cookie"
import { useEffect } from "react"
import axios from "axios"

const Main = () => {

    const MY_USER_API = 'http://localhost:8080/my-user' //move to .env

    const [cookies, setCookies , removeCookies] = useCookies(['token'])
    

    useEffect(() => {

        axios
        .get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => console.log(resp))
        .catch(err => console.log(err))

    },[])


    return(
        <div className="main-container">
            Main.jsx
        </div>
    )
}


//add titles to this page
export default Main