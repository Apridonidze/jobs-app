import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useState,useEffect } from "react"; //importing react hooks

import Error from "../alerts/Error";
import UploadAvatar from "../components/UploadAvatar";
import RecruiterForms from "../components/RecruiterForms";
import EmployeeForms from "../components/EmployeeForms";
import UploadTechnologies from '../components/UploadTechnologies';
import UploadTags from "../components/UploadTags";
import UploadRole from "../components/UploadRole"; //importing react components

import DefaultImage from '../../assets/default-profile-picture.webp'; //importing dafault image for profile picture




const MyUserSidebar = ( { user } ) => {

    const [cookies] = useCookies(['token']) ;//cookies

    const AVATAR_URL = 'http://localhost:8080/avatar'; //api url to get my user profile picture
    const USER_TAGS_URL = 'http://localhost:8080/tags/my-tags' //api url to get my user tags
    const USER_TECHNOLOGIES_URL = 'http://localhost:8080/technologies/user-technologies'; //api url to get my user technologies
    const USER_ROLES_URL = 'http://localhost:8080/roles/my-roles';//api url to get my user roles (for recruiters)
    
    const [toggleUploadAvatar,setToggleUploadAvatar] = useState(false);//toggles UploadAvatar component
    const [toggleUploadTags,setToggleUploadTags] = useState(false); //toggles UploadTags component
    const [toggleUploadRole,setToggleUploadRole] = useState(false); //toggles UploadRoles component
    const [toggleUploadTechnologies,setToggleUploadTechnologies] = useState(false); //toggles Uploadtechnologies component
    const [toggleError, setToggleError] = useState(false); //toggles Error component 

    const [tags,setTags] = useState([]); //sstate for tags
    const [technologies, setTechnologies] = useState([]); //state for technologies
    const [roles,setRoles] = useState([]); //state for roles
    const [avatarImg,setAvatarImg] = useState(''); //state for avatar image path
    const [profilePicture, setProfilePicture] = useState(null); //state for avatar image



    const handleProfileSend = (e) => {

        e.preventDefault(); //prevents page reaload when function triggers

        if (e.target.files && e.target.files[0]) { //checks if input is not employ

            const filePath = e.target.files[0]; //gets input first file 
            setProfilePicture(filePath); //sets choosed file to state that is later send to server 

        };
    }; //triggers when profile input is targeted and changed



    useEffect(() => {

        const fetchUserData = async () => {

            //function gets all of the data about user from server, all requests are in promise block 

            try{
                    
                await Promise.all([
                
                    axios.get(AVATAR_URL, {headers: {Authorization : `Bearer ${cookies.token}`}}) //fetches data from server about user avatar image
                    .then(resp => {

                        if(resp.status === 204)setAvatarImg(DefaultImage) , setToggleError(false); //if user does not hhave avatar iamge default iamge is shown
                        else setAvatarImg(resp.data) , setToggleError(false); //else functiuon sets response to setAvatar state

                    }),

                    axios.get(USER_TAGS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}}) //fetches data about user tags
                    .then(resp => {
                        if(resp.status === 204) setTags([]) , setToggleError(false); // if user does not have tags , it sets setTags state to empty array
                        else setTags([...resp.data]) , setToggleError(false); //else tags are stored in state
                    
                    }), 

                    axios.get(USER_ROLES_URL, {headers : {Authorization : `Bearer ${cookies.token}`}}) //fetches data about user roles
                    .then(resp => {

                        if(resp.status === 204) setRoles([]) , setToggleError(false); //if user does not have roles , it sets setRoles to empty array
                        else setRoles([...resp.data.user_roles]) , setToggleError(false); //else roels are stored in state

                    }), 
                    
                    axios.get(USER_TECHNOLOGIES_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})]) //fetches data about user technologies
                    .then(resp => {

                        if(resp.status === 204) setTechnologies([]) , setToggleError(false); //if user does not have any technologies it sets state to empty array
                        else setTechnologies(resp.filter(res => res != undefined)[0].data) , setToggleError(false); //else it sets technologies to stae

                        }
                    );

                }catch(err){
                    console.log(err); //add alert messsage fro database error
                    setToggleError(true); // toggles Error component if error occurs
                };
            };

            fetchUserData();//declearing function
        

        },[]);//fetchUserData function triggers once this component is rendered

    useEffect(() => {
            
        if(profilePicture){
                
            const formData = new FormData(); //object for picture content
            formData.append("profile-picutre", profilePicture); //appens profilePicture state value into object

            axios.post(AVATAR_URL , formData , {headers : {Authorization : `Bearer ${cookies.token}`}}) //posts avatar image content to server
            .then(resp => {console.log(resp.data); window.location.reload()}) //consoles response and realoads page to display new image of user as sson as possible
            .catch(err => {console.log(err) ; setToggleError(true)}) //add alert message here

        };

    }, [profilePicture]); //function triggers once profilePicture variable is changed

    
    return (

        <div className="my-user-sidebar-container col-12 col-sm-12 col-lg-3">
           
            {toggleError && <Error setToggleError={setToggleError}/>}

            {toggleUploadAvatar && 
                    <> 
                        <div className="upload-avatar-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadAvatar(false)}></div> 
                        <UploadAvatar handleProfileSend={handleProfileSend} avatarImg={avatarImg} DefaultImage={DefaultImage}/> 
                    </> 
            }

            {toggleUploadTags &&
                
                <>
                    <div className="upload-tags-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadTags(false)}></div>
                    <UploadTags tags={tags} setTags={setTags} setToggleError={setToggleError}/>
                </>

            }

            {toggleUploadTechnologies &&
                <>
                    <div className="upload-technologies-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadTechnologies(false)}></div>
                    <UploadTechnologies technologies={technologies} setTechnologies={setTechnologies} setToggleError={setToggleError}/>
                    
                </>
            }

            {toggleUploadRole &&
                <>
                    <div className="upload-roles-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadRole(false)}></div>
                    <UploadRole setRoles={setRoles} roles={roles} setToggleError={setToggleError}/>
                </>
            }

            <div className="my-user-sidebar-header" >

                <div className="user-image-container container d-flex flex-column gap-4 py-2">
                    
                    <img src={avatarImg || DefaultImage} className="border mx-auto" style={{borderRadius : '100%' , width : "30vh", height:'30vh' , maxWidth: '300px' , maxHeight: '300px'}}/>
                    <button className="btn btn-primary text-white w-100 text-break" onClick={() => setToggleUploadAvatar(true)}>Upload Your Profile Picture</button>

                </div>
                
                <div className="user-sidebar-body">
                    
                    {user && user.role === 'Recruiter' && <RecruiterForms setToggleUploadTags={setToggleUploadTags} tags={tags}/>}
                    {user && user.role === 'Employee' && <EmployeeForms setToggleUploadTechnologies={setToggleUploadTechnologies} roles={roles} setToggleUploadRole={setToggleUploadRole} technologies={technologies}/>}

                </div>
                
            </div>
            
        </div>
    );
};



export default MyUserSidebar; //exporting component