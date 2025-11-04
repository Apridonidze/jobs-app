import DefaultImage from '../../assets/default-profile-picture.webp'
import Footer from '../components/Foooter'
import NavBar from '../navbar/NavBar'
import NavBarHeader from '../navbar/NavBarHeader'


const OtherUserData = ( { userData } ) => {
    
console.log(userData)

    return (
        <div className="other-user-data container min-vh-100 d-flex flex-column justify-content-between">
            <NavBarHeader />
            <div className="other-user-data-header d d-flex">
                <div className="other-user-data-row">
                    <img src={userData ? userData.user_avatar : DefaultImage} className="border border-rounded" style={{borderRadius : '100%', width: '350px' , height:'350px'}}/>
                                
                </div>
                <div className="other-user-data-row">
                    <h1>{userData.user.user_name} {userData.user.user_surname}</h1>
                    <h4>{userData.user.user_email} {userData.user.user_phoneNumber}</h4>
                    
                    {userData.user.user_role === 'Employee' && <><h4>{userData.user_roles}</h4> <h4>{userData.user_technologies}</h4> </>}
                    
                    <h4>{userData.user_desc}</h4>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default OtherUserData