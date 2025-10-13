import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const MyUserSidebar = () => {

    const [cookies,setCookies, removeCookies] = useCookies(['token'])

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

    return (
        <div className="my-user-sidebar-container">

            <i className="fa-solid fa-user"></i> {/** add logic : if user doesnot provide user profile picutre dispaly default user else dispaly their profile picture */}
            
            <div className="form-floating">
                <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)}  accept="image/png, image/jpeg, image/webp" />
                <label htmlFor="">Add Your Profile Picture...</label>
            </div>

            <h1>Finish Up Your Profile </h1>

            {/* user avatar if they havenot added yet return 'default avatar picture'*/} 
            {/* user description ,if they havenot added yet return 'no desc yet'*/} 
            {/* user tags ,if they havenot added yet return 'no tags yet'*/} 
            {/* user speaking languages,if they havenot added yet return 'no langauges added yet'*/} 

        </div>
    )
}



export default MyUserSidebar