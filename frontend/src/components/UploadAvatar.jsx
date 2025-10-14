const UploadAvatar = ( { handleProfileSend,avatarImg,DefaultImage } ) => {

   

    return(
        <div className="upload-avatar-container container position-fixed w-50 bg-white d-flex flex-column justify-content-center text-center align-items-center">
            
            
        <img src={avatarImg || DefaultImage} className="border border-rounded" style={{borderRadius : '100%', width: '350px' , height:'350px'}}/>

        <span>Upload Your Avatar</span>    
        
        <div className="form-floating">
            
            <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)}  accept="image/png, image/jpeg, image/webp" />
            <label htmlFor="">Add Your Profile Picture...</label>
    
        </div>
    
    </div>
    
)
}


export default UploadAvatar