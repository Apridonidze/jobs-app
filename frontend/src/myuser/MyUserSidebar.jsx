import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import UploadAvatar from "../components/UploadAvatar"


const MyUserSidebar = () => {

    const [cookies,setCookies, removeCookies] = useCookies(['token'])
    
    const [toggleUploadAvatar,setToggleUploadAvatar] = useState(false)

    return (
        <div className="my-user-sidebar-container">

           
           {toggleUploadAvatar && <UploadAvatar />}


            <h1>Finish Up Your Profile </h1>


            <button onClick={() => setToggleUploadAvatar(true)}>Upload Your Avatar Picture</button>

            {/* import your profile picture here and pass down to uploadavatar to use it as a placeholder */}

            {/* user avatar if they havenot added yet return 'default avatar picture'*/} 
            {/* user description ,if they havenot added yet return 'no desc yet'*/} 
            {/* user tags ,if they havenot added yet return 'no tags yet'*/} 
            {/* user speaking languages,if they havenot added yet return 'no langauges added yet'*/} 

        </div>
    )
}



export default MyUserSidebar