import DefaultImage from '../../assets/default-profile-picture.webp'
import Footer from '../components/Foooter'
import NavBarHeader from '../navbar/NavBarHeader'

import '../main.css'

const OtherUserData = ( { userData } ) => {
    

    return (
        <div className="other-user-data container d-flex flex-column justify-content-between min-vh-100" >
            
            <NavBarHeader />

            <div className="other-user-container container  ">
                <div className="other-user-sidebar col-12 col-sm-12 col-lg-3">
                    
                    <img src={userData.user_avatar || DefaultImage} className="border  mx-auto" style={{borderRadius : '100%' , width : "30vh", height:'30vh' , maxWidth: '300px' , maxHeight: '300px'}}/>
                                                 
                </div>
                <div className="other-user-main col p-4 col-12 col-sm-9 border-start g-3">
                    <h1>{userData.user.user_name} {userData.user.user_surname}</h1>
                    <h4>{userData.user.user_email} {userData.user.user_phoneNumber}</h4>
                    
                    {userData.user.user_role === 'Employee' && <><h4>{userData.user_roles}</h4> <h4>{userData.user_technologies}</h4> </>}
                    {userData.user.user_role === 'Recruiter' && <><h4>{userData.user_tags}</h4> </>}
                    
                    <h4>{userData.user_desc ? userData.user_desc : 'No Description Yet.'}</h4>
                </div>
            </div>

            <Footer />
            
        </div>
    )
}


export default OtherUserData