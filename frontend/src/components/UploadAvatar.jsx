import '../main.css' ; //importing css file

const UploadAvatar = ( { handleProfileSend,avatarImg,DefaultImage } ) => {

    return(
        
        <div className="upload-avatar-container container position-fixed bg-white p-3 rounded-2 gap-3 col-12 col-sm-6"  >
            
            <div className="form-header d-flex flex-column text-center gap-3">
                
                <img src={avatarImg || DefaultImage} className="border border-rounded mx-auto" style={{borderRadius : '100%' , width : "30vh", height:'30vh' , maxWidth: '300px' , maxHeight: '300px'}}/>

                <span>Upload Your Avatar</span>    
            
            </div>
            
            <div className="form-floating">
                
                <input type="file" className="form-control" onChange={(e) => handleProfileSend(e)}  accept="image/png, image/jpeg, image/webp" />
                <label htmlFor="">Add Your Profile Picture...</label>
        
            </div>
    
    </div>
    );
};

export default UploadAvatar; //exporting component