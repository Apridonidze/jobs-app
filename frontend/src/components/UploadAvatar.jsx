import axios from "axios"
import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"

const UploadAvatar = () => {

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


    return(
        <div className="upload-avatar-container">
            
        <i className="fa-solid fa-user"></i> {/** add logic : if user doesnot provide user profile picutre dispaly default user else dispaly their profile picture */}

        <div className="form-floating">
            
            <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)}  accept="image/png, image/jpeg, image/webp" />
            <label htmlFor="">Add Your Profile Picture...</label>
    
        </div>
    
    </div>
    
)
}


export default UploadAvatar