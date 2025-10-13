import { useEffect, useState } from "react"

const MyUserSidebar = () => {

    const [profilePicture, setProfilePicture] = useState(null)

    const handleProfileSend = (e) => {

        e.preventDefault()

        if (e.target.files && e.target.files[0]) {
            const filePath = e.target.files[0]
            setProfilePicture(filePath)
            }
        }

        useEffect(() => {
  if (profilePicture) {
    console.log("New profile picture selected:", profilePicture)
  }
}, [profilePicture])

    return (
        <div className="my-user-sidebar-container">

            <i className="fa-solid fa-user"></i> {/** add logic : if user doesnot provide user profile picutre dispaly default user else dispaly their profile picture */}
            
            <div className="form-floating">
                <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)} />
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