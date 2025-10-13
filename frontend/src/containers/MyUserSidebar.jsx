const MyUserSidebar = () => {


    const handleProfileUpload = () => {
        console.log('sadnjasmdnjksad')
    }

    return (
        <div className="my-user-sidebar-container">

            <i className="fa-solid fa-user" title="Click Here To Add Your Profile Picture" onClick={handleProfileUpload}></i> {/** add logic : if user doesnot provide user profile picutre dispaly default user else dispaly their profile picture */}

            <h1>Finish Up Your Profile </h1>

            {/* user avatar if they havenot added yet return 'default avatar picture'*/} 
            {/* user description ,if they havenot added yet return 'no desc yet'*/} 
            {/* user tags ,if they havenot added yet return 'no tags yet'*/} 

        </div>
    )
}



export default MyUserSidebar