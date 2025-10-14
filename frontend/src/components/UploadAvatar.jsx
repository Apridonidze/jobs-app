const UploadAvatar = ( { handleProfileSend,avatarImg,DefaultImage } ) => {

   

    return(
        <div className="upload-avatar-container position-relative bg-white d-flex flex-column text-center">
            
            
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