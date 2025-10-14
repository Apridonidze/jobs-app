
import axios from "axios"
import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"

import UploadAvatar from "../components/UploadAvatar"
import DefaultImage from '../../assets/default-profile-picture.webp'


const MyUserSidebar = () => {

    const [toggleUploadAvatar,setToggleUploadAvatar] = useState(false)

     const [avatarImg,setAvatarImg] = useState('')

    const MY_AVATAR_URL = 'http://localhost:8080/my-avatar' //move to .env

    const [cookies,setCookies,removeCookies] = useCookies(['token']) 

    const UPLOAD_AVATAR_URL = 'http://localhost:8080/upload-avatar'

    const [profilePicture, setProfilePicture] = useState(null)

    const handleProfileSend = (e) => {

        e.preventDefault()

        if (e.target.files && e.target.files[0]) {
            const filePath = e.target.files[0]
            setProfilePicture(filePath)
            }
        }

        useEffect(() => {
            
            if(profilePicture){
                
                const formData = new FormData();
                formData.append("profile-picutre", profilePicture);

                axios.post(UPLOAD_AVATAR_URL , formData , {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
                .catch(err => console.log(err))

            }

        }, [profilePicture])

        useEffect(() => {

            axios.get(MY_AVATAR_URL, {headers: {Authorization : `bearer ${cookies.token}`}})
            .then(resp => setAvatarImg(resp.data))
            .catch(err => console.log(err))

        },[avatarImg])
    
        // fetch profile piicture from server and set as a profileImage variable and set as profile image

    return (
        <div className="my-user-sidebar-container d-flex flex-column">
           
           {toggleUploadAvatar && <> <div className="upload-avatar-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadAvatar(false)}></div> <UploadAvatar handleProfileSend={handleProfileSend} avatarImg={avatarImg} DefaultImage={DefaultImage}/> </> }

            <h1>Finish Up Your Profile </h1>

            <img src={avatarImg || DefaultImage} className="border border-rounded" style={{borderRadius : '100%', width: '350px' , height:'350px'}}/>
            

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