import { useCookies } from "react-cookie"
import { jwtDecode } from 'jwt-decode'

const Main = () => {

    const [cookies, setCookies , removeCookies] = useCookies(['token'])
    
    console.log(jwtDecode(cookies.token)) //temporary here

    return(
        <div className="main-container">
            Main.jsx
        </div>
    )
}


export default Main