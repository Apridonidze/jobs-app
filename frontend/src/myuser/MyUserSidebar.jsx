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
    const [tagsMessage,setTagsMessage] = useState('')
    const [toggleTagsMessage,setToggleTagsMessage] = useState(false)
    const [isTagsSuccessfull, setIsTagsSuccessfull] = useState(null)

    const [technologies, setTechnologies] = useState([])
    const [technologiesMessage, setTechnologiesMessage] = useState('')
    const [toggleTechnologiesMessage, setToggleTechnologiesMessage] = useState(false)
    const [isTechnologiesSuccessfull, setIsTechnologiesSuccessfull] = useState(null)

    const [roles,setRoles] = useState([])
    


    const [avatarImg,setAvatarImg] = useState('')

    const AVATAR_URL = 'http://localhost:8080/avatar' //move to .env
    const USER_DESC_URL = 'http://localhost:8080/desc/my-desc' //move to .env
    const USER_TAGS_URL= 'http://localhost:8080/tags/my-tags' //move to .env
    

    const [cookies,setCookies,removeCookies] = useCookies(['token']) 


    const [profilePicture, setProfilePicture] = useState(null)

    const handleProfileSend = (e) => {

        e.preventDefault()

        if (e.target.files && e.target.files[0]) {
            const filePath = e.target.files[0]
            setProfilePicture(filePath)
        }
    }



        useEffect(() => {

            axios.get(AVATAR_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => setAvatarImg(resp.data))
            .catch(err => console.log(err)) //setavatarimg to default if error


            axios.get(USER_DESC_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => setDescValue(`${resp.data.slice(0, 25)}...`)) 
            .catch(err => console.log(err)) //add error message here and setDescValue to empty if there is no desc or database error


            axios.get(USER_TAGS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => setTags(resp.data))
            .catch(err => console.log(err))
        

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
        <div className="my-user-sidebar-container d-flex flex-column">
           
           {toggleUploadAvatar && 
                <> 
                    <div className="upload-avatar-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadAvatar(false)}></div> 
                    <UploadAvatar handleProfileSend={handleProfileSend} avatarImg={avatarImg} DefaultImage={DefaultImage}/> 
                </> 
            }
           
           
           {toggleUploadDesc && 

                <> 
                    <div className="upload-desc-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadDesc(false)}></div> 
                    <UploadDesc setToggleUploadDescMessage={setToggleUploadDescMessage} setIsDescSuccessfull={setIsDescSuccessfull} setUploadMessage={setUploadMessage}/> 
                    {toggleUploadDescMessage && 
                    <DescMessage setToggleUploadDesc={setToggleUploadDesc} setToggleUploadDescMessage={setToggleUploadDescMessage} isDescSuccessfull={isDescSuccessfull} UploadMessage={UploadMessage} /> }
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
                    <UploadRole />
                </>
            }

            <h1>Finish Up Your Profile </h1> {/**check if user has to finish their profile by fetching data form the database andd display it based on this option from backend (make another route to check if user has all data inserted )*/}

            <img src={avatarImg || DefaultImage} className="border border-rounded" style={{borderRadius : '100%', width: '350px' , height:'350px'}}/>
            

            <button className="btn btn-primary text-white" onClick={() => setToggleUploadAvatar(true)}>Upload Your Profile Picture</button>

            <input type="text" className="form-control" value={descValue ? descValue : 'No Description Yet'} onClick={() => setToggleUploadDesc(true)} placeholder="Add About Me..."/>

            {user && user.role === 'Recruiter' && <RecruiterForms setToggleUploadTags={setToggleUploadTags} tags={tags}/>}
            {user && user.role !== 'Employee' && <EmployeeForms setToggleUploadTechnologies={setToggleUploadTechnologies} roles={roles} setToggleUploadRole={setToggleUploadRole} />}



        </div>
    )
}



export default MyUserSidebar