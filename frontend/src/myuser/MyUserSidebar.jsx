import axios from "axios"
import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"

import UploadAvatar from "../components/UploadAvatar"
import DefaultImage from '../../assets/default-profile-picture.webp'
import UploadDesc from "../components/UploadDesc"
import DescMessage from '../alerts/DescMessage'

const MyUserSidebar = ( { user } ) => {

    const [toggleUploadAvatar,setToggleUploadAvatar] = useState(false)
    const [toggleUploadDesc,setToggleUploadDesc] = useState(false)
    const [toggleUploadTags,setToggleUploadTags] = useState(false)
    const [toggleUploadLanguages,setToggleUploadLanguages] = useState(false)

    
    const [descValue,setDescValue] = useState('')
    const [toggleUploadDescMessage, setToggleUploadDescMessage] = useState(false)
    const [UploadMessage,setUploadMessage] = useState('')
    const [isDescSuccessfull, setIsDescSuccessfull] = useState(null)


    const [avatarImg,setAvatarImg] = useState('')

    const AVATAR_URL = 'http://localhost:8080/avatar' //move to .env
    const USER_DESC_URL = 'http://localhost:8080/desc/my-desc' //move to .env

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

            <h1>Finish Up Your Profile </h1> {/**check if user has to finish their profile by fetching data form the database andd display it based on this option from backend (make another route to check if user has all data inserted )*/}

            <img src={avatarImg || DefaultImage} className="border border-rounded" style={{borderRadius : '100%', width: '350px' , height:'350px'}}/>
            

            <button className="btn btn-primary text-white" onClick={() => setToggleUploadAvatar(true)}>Upload Your Profile Picture</button>

            <input type="text" className="form-control" value={descValue ? descValue : 'No Description Yet'} onClick={() => setToggleUploadDesc(true)} placeholder="Add About Me..."/>

            {user.role === 'Recruiter' && <></>}
            {user.role === 'Employee' && <></>}


            

            {/* if user is worket dispaly these 

            /*<div className="technologies">
                {/* fetch and map skills here if there is not any return no skills yet */
               /*  <span>Add Skills</span>
             /*</div>

            <div className="languages">
                /**fetch whichj language does user speaks and add add button hjere to add their language here */
             /*</div>


             else if user is recruiter display these :

             <div className="tags">
             add what type of comany he has and what type  of employees he is willing to attract 
             </div>
 */}


        </div>
    )
}



export default MyUserSidebar