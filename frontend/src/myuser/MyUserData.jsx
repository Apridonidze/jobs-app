const MyUserData = ( { user, descValue , setToggleUploadDesc } ) => {
    return(
        <div className="my-user-data col-12 col-sm-9 border-start ">

            <div className="user-data">
            
                <span>Your Name : {user.name}</span> 
                <span>Your Surname : {user.surname}</span>  
                <span>Your Birth Date : {user.birthDate.slice(0, 10)}</span>    
                <span>Your Gender: {user.gender}</span>   
                
            </div>
            
          
            <div className="desc-container">
                <div className="desc-header d d-flex">
                        
                    <h1>Description :</h1>
                    <h1 onClick={() => setToggleUploadDesc(true)}>{descValue ? 'Edit...' : 'Add Description...'}</h1>
                
                </div>
                
                <div className="desc-main">

                    <h4 className="text-break">{descValue ? descValue : 'No Description Yet'}</h4>
                
                </div>
                
            </div>

        </div>
    )
}


export default MyUserData