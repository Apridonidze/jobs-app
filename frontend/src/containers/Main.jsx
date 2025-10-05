import { useCookies } from "react-cookie"
import { jwtDecode } from 'jwt-decode'

const Main = () => {

    const [cookies, setCookies , removeCookies] = useCookies(['token'])
    
    console.log(jwtDecode(cookies.token)) //temporary here

    //createa axios get functiuon form database to display your data (non-sensible)
    return(
        <div className="main-container">
            Main.jsx
        </div>
    )
}


//add titles to this page
export default Main