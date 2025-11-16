import '../main.css'; //importing css file

const MyUserData = ( { user, descValue , setToggleUploadDesc } ) => {
    return(
        <div className="my-user-data p-4 col-12 col-sm-9 border-start g-3">

            <div className="user-data d-flex flex-column ">
            
                <span className="fs-3 py-2">{user.name} {user.surname}</span> 
                
                <span className="fs-4 py-2"><i class="fa-regular fa-calendar"></i> {user.birthDate.slice(0, 10)}</span>    
                <span className="fs-4 text-capitalize py-2"><i class="fa-solid fa-venus-mars"></i> {user.gender}</span>   
                
            </div>
            
          
            <div className="desc-container py-2">
                <div className="desc-header container d-flex justify-content-between ">
                        
                    <h1>Description :</h1>
                    <h1 className='bg-primary text-white rounded-2 p-2 fs-5 h-25'  onClick={() => setToggleUploadDesc(true)}>{descValue ? 'Edit...' : 'Add Description...'}</h1>
                
                </div>
                
                <div className="desc-main px-3">

                    <h4 className="text-break">{descValue ? descValue : 'No Description Yet'}</h4>
                
                </div>
                
            </div>

        </div>
    );
};


export default MyUserData; //exporting component