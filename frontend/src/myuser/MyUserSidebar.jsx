import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import UploadAvatar from "../components/UploadAvatar"

const MyUserSidebar = () => {

    const [cookies,setCookies, removeCookies] = useCookies(['token'])

    

    return (
        <div className="my-user-sidebar-container">

            <i className="fa-solid fa-user"></i> {/** add logic : if user doesnot provide user profile picutre dispaly default user else dispaly their profile picture */}
            
         

            <UploadAvatar />

            <h1>Finish Up Your Profile </h1>

            {/* user avatar if they havenot added yet return 'default avatar picture'*/} 
            {/* user description ,if they havenot added yet return 'no desc yet'*/} 
            {/* user tags ,if they havenot added yet return 'no tags yet'*/} 
            {/* user speaking languages,if they havenot added yet return 'no langauges added yet'*/} 

        </div>
    )
}



export default MyUserSidebar