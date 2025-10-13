import { useState } from "react"

const MyUserSidebar = () => {

    const [profilePicture,setProfilePicture] = useState([])

    const handleProfileSend = (e) => {
        if(e.target){
            setProfilePicture(e.target.files[0])
        }
    }

    return (
        <div className="my-user-sidebar-container">

            <i className="fa-solid fa-user"></i> {/** add logic : if user doesnot provide user profile picutre dispaly default user else dispaly their profile picture */}
            
            <div className="form-floating">
                <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)} value={profilePicture}/>
                <label htmlFor="">Add Your Profile Picture...</label>
            </div>

            <h1>Finish Up Your Profile </h1>

            {/* user avatar if they havenot added yet return 'default avatar picture'*/} 
            {/* user description ,if they havenot added yet return 'no desc yet'*/} 
            {/* user tags ,if they havenot added yet return 'no tags yet'*/} 

        </div>
    )
}



export default MyUserSidebar