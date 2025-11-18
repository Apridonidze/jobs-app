import DefaultImage from '../../assets/default-profile-picture.webp';//importig default avatar image

import Footer from '../components/Foooter';
import NavBarHeader from '../navbar/NavBarHeader'; //importing components

import '../main.css'; //importing css file

const OtherUserData = ( { userData } ) => {

    return (
        <div className="other-user-data container d-flex flex-column justify-content-between min-vh-100 " >
            
            <NavBarHeader />

            <div className="other-user-container  row row-cols-1 row-cols-sm-2 ">
                <div className="other-user-sidebar col ">
                    
                    <img src={userData.user_avatar || DefaultImage} className="border  mx-auto" style={{borderRadius : '100%' , width : "30vh", height:'30vh' , maxWidth: '300px' , maxHeight: '300px'}}/>
                    
                    <div className="row my-4">
                        
                        {userData.user.user_role === 'Recruiter' ? <div className="tags-container col">Tag : {userData.user_tags.map((tag ,tagId) => (<span className="bg-success text-white m-1  p-2 rounded-2 "  key={tagId}>{tag}</span>))}</div> 
                        : <>
                            <div className='roles-container my-4'>
                                Role : {userData.user_roles.map((role, roleId) => (<span className="bg-success text-white m-1  p-2 rounded-2 " key={roleId}>{role}</span>))}
                            </div>

                            <div className="technologies-container my-2">
                                Technologies : {userData.user_technologies.map((tech, techId) => (<span className="bg-success text-white m-1  p-2 rounded-2 " key={techId}>{tech}</span>) )}
                            </div>
                        </>  
                        }

                    </div>

                </div>
                <div className="other-user-main col">
                    
                    <h1 className='text-break'>{userData.user.user_name} {userData.user.user_surname}</h1>
                    <h4 className='text-break'>{userData.user.user_email} {userData.user.user_phoneNumber}</h4>
                    
                    <h4 className='text-break'>{userData.user_desc ? userData.user_desc : 'No Description Yet.'}</h4>
                </div>
            </div>

            <Footer />
            
        </div>
    );
};

document.title = `Jobs App `; //title for page

export default OtherUserData; //exporting component