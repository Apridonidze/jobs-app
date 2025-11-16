import axios from "axios"
import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"

import UploadAvatar from "../components/UploadAvatar"
import UploadDesc from "../components/UploadDesc"
import RecruiterForms from "../components/RecruiterForms"
import EmployeeForms from "../components/EmployeeForms"
import UploadTechnologies from '../components/UploadTechnologies'

import DescMessage from '../alerts/DescMessage'

import DefaultImage from '../../assets/default-profile-picture.webp'
import UploadTags from "../components/UploadTags"
import UploadRole from "../components/UploadRole"



const MyUserSidebar = ( { user } ) => {

    const [toggleUploadAvatar,setToggleUploadAvatar] = useState(false)
    const [toggleUploadDesc,setToggleUploadDesc] = useState(false)
    const [toggleUploadTags,setToggleUploadTags] = useState(false)
    const [toggleUploadRole,setToggleUploadRole] = useState(false)
    const [toggleUploadTechnologies,setToggleUploadTechnologies] = useState(false)
    const [toggleUploadLanguages,setToggleUploadLanguages] = useState(false)

    
    const [descValue,setDescValue] = useState('')
    const [toggleUploadDescMessage, setToggleUploadDescMessage] = useState(false)
    const [UploadMessage,setUploadMessage] = useState('')
    const [isDescSuccessfull, setIsDescSuccessfull] = useState(null)

    const [tags,setTags] = useState([])

    const [technologies, setTechnologies] = useState([])

    const [roles,setRoles] = useState(Array)
    


    const [avatarImg,setAvatarImg] = useState('')

    const AVATAR_URL = 'http://localhost:8080/avatar' //move to .env
    const USER_TAGS_URL = 'http://localhost:8080/tags/my-tags' //move to .env
    const USER_TECHNOLOGIES_URL = 'http://localhost:8080/technologies/user-technologies' //move to .env
    const USER_ROLES_URL = 'http://localhost:8080/roles/my-roles' //move to .env
    

    const [cookies] = useCookies(['token']) 


    const [profilePicture, setProfilePicture] = useState(null)

    const handleProfileSend = (e) => {

        e.preventDefault()

        if (e.target.files && e.target.files[0]) {
            const filePath = e.target.files[0]
            setProfilePicture(filePath)
        }
    }



        useEffect(() => {

            const fetchUserData = async () => {
                try{
                    
                    await Promise.all([
                    axios.get(AVATAR_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {

                        if(resp.status === 204)setAvatarImg(DefaultImage)
                        else setAvatarImg(resp.data)

                    }),

                    axios.get(USER_TAGS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) setTags([])        
                        else setTags([...resp.data])
                    
                    }), 

                    axios.get(USER_ROLES_URL, {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) setRoles([])
                        else setRoles([resp.data[0].user_roles])
                    }), 
                    
                    axios.get(USER_TECHNOLOGIES_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})])
                    .then(resp => {
                        if(resp.status === 204) setTechnologies([])
                        else setTechnologies(resp.filter(res => res != undefined)[0].data)
                    }
                    )

                    

                }catch(err){
                    console.log(err) //add alert messsage fro database error
                }
            }

            fetchUserData()
        

        },[])


        useEffect(() => {
            
            if(profilePicture){
                
                const formData = new FormData();
                formData.append("profile-picutre", profilePicture);

                axios.post(AVATAR_URL , formData , {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp)) //addd alerts message here
                .catch(err => console.log(err)) //add alert message here

            }

        }, [profilePicture])

    
    return (
        <div className="my-user-sidebar-container col-12 col-sm-12 col-lg-3">
           
           {toggleUploadAvatar && 
                <> 
                    <div className="upload-avatar-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadAvatar(false)}></div> 
                    <UploadAvatar handleProfileSend={handleProfileSend} avatarImg={avatarImg} DefaultImage={DefaultImage}/> 
                </> 
            }
           
           
           

            {toggleUploadTags &&
                
                <>
                    <div className="upload-tags-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadTags(false)}></div>
                    <UploadTags tags={tags} setTags={setTags} />
                </>

            }

            {toggleUploadTechnologies &&
                <>
                    <div className="upload-technologies-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadTechnologies(false)}></div>
                    <UploadTechnologies technologies={technologies} setTechnologies={setTechnologies}/>
                    
                </>
            }

            {toggleUploadRole &&
                <>
                    <div className="upload-roles-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadRole(false)}></div>
                    <UploadRole setRoles={setRoles} roles={roles}/>
                </>
            }

            <div className="my-user-sidebar-header" >
                <div className="user-image-container container d-flex flex-column gap-4 py-2 ">
                    
                    <img src={avatarImg || DefaultImage} className="border  mx-auto" style={{borderRadius : '100%' , width : "30vh", height:'30vh' , maxWidth: '300px' , maxHeight: '300px'}}/>
                    <button className="btn btn-primary text-white w-100 text-break" onClick={() => setToggleUploadAvatar(true)}>Upload Your Profile Picture</button>

                </div>
                
                <div className="user-sidebar-body">
                    
                    {user && user.role === 'Recruiter' && <RecruiterForms setToggleUploadTags={setToggleUploadTags} tags={tags}/>}
                    {user && user.role === 'Employee' && <EmployeeForms setToggleUploadTechnologies={setToggleUploadTechnologies} roles={roles} setToggleUploadRole={setToggleUploadRole} technologies={technologies}/>}

                </div>
                
            </div>
            
        </div>
    )
}



export default MyUserSidebar