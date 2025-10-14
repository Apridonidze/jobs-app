import axios from "axios"
import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"

import DefaultImage from '../../assets/default-profile-picture.webp'

const UploadAvatar = () => {

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

        },[])

    return(
        <div className="upload-avatar-container position-relative bg-white d-flex flex-column text-center">
            
            
        <img src={avatarImg} className="w-25 h-25 border border-rounded" style={{borderRadius : '50vh'}}/>

        <span>Upload Your Avatar</span>    
        
        <div className="form-floating">
            
            <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)}  accept="image/png, image/jpeg, image/webp" />
            <label htmlFor="">Add Your Profile Picture...</label>
    
        </div>
    
    </div>
    
)
}


export default UploadAvatar