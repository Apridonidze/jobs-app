import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

import Error from "../alerts/Error";
import DescMessage from '../alerts/DescMessage';
import ProfileMessage from "../alerts/ProfileMessage";
import UploadDesc from "../components/UploadDesc";
import Footer from "../components/Foooter";
import NavBarHeader from "../navbar/NavBarHeader";
import MyUserSidebar from "./MyUserSidebar";
import MyUserData from "./MyUserData"; //importing react components

const MyUser = () => {

    const [cookies , removeCookies] = useCookies(['token']); //cookies

    const navigator = useNavigate(); //defining navigator to use for user navigation through pages

    const MY_USER_API = 'http://localhost:8080/user/my-user'; //api url that fetches data about my user
    const IS_PROFILE_FINISHED_URL = 'http://localhost:8080/is-profile-finished'; //api url that fetches data if i finised my profile or not 
    const USER_DESC_URL = 'http://localhost:8080/desc/my-desc'; // api url that fetches data about my account descripotion


    const [user,setUser] = useState(null); //state for my user data
    const [isProfileFinished , setIsProfileFinished] = useState(null); //state for my profile status
    const [descValue,setDescValue] = useState(''); //state for my user desc
    const [UploadMessage,setUploadMessage] = useState(''); //state to show in message toggle if user successfully uploaded desc
    const [isDescSuccessfull, setIsDescSuccessfull] = useState(null); //state to define if request to server about desc update/upload was successsfull

    const [toggleUploadDesc,setToggleUploadDesc] = useState(false);//state to toggle UploadDesc.jsx component
    const [toggleUploadDescMessage, setToggleUploadDescMessage] = useState(false); //state to DescMessage.jsx component
    const [toggleError,setToggleError] = useState(false); //state to toggle Error.jsx component if internal error occurs
    

    useEffect(() => {

        const FetchMyUser = async () => {

            try{

                await Promise.all([
                    axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {const userData = resp.data ; setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender}) ; setToggleError(false)}),
                    axios.get(IS_PROFILE_FINISHED_URL , {headers: {Authorization : `Bearer ${cookies.token}`}}).then(resp => {setIsProfileFinished(resp.data), setToggleError(false)}),
                    axios.get(USER_DESC_URL , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {setDescValue(resp.data), setToggleError(false)}), 
                ]);//fetching data from apis to get data about my user (my user data , my user profile status , my user desc) in one promise

            }catch(err){
                
                console.log(err); //consoles error
                setToggleError(true); //toggles Errro component if internal error occurs
            
            };
        } ;

        FetchMyUser();//declearing function

    },[]); //function triggers when component is mounted

    return (
        <div className="myuser-container container d-flex flex-column justify-content-between  min-vh-100">
            
            <NavBarHeader user={user} />
           
            {isProfileFinished != null && !isProfileFinished && <ProfileMessage />}

            {toggleUploadDesc && 

                <> 
                
                    <div className="upload-desc-background position-fixed bg-dark opacity-75 w-100 h-100 top-0 start-0" onClick={() => setToggleUploadDesc(false)}></div> 
                    <UploadDesc setToggleUploadDescMessage={setToggleUploadDescMessage} setIsDescSuccessfull={setIsDescSuccessfull} setUploadMessage={setUploadMessage} /> 

                    {toggleUploadDescMessage && 
                    <DescMessage setToggleUploadDesc={setToggleUploadDesc} setToggleUploadDescMessage={setToggleUploadDescMessage} isDescSuccessfull={isDescSuccessfull} UploadMessage={UploadMessage} /> }
                
                </>

            }

            {toggleError && <Error setToggleError={setToggleError}/>}
            
            <div className="user-body row border-bottom">
                <MyUserSidebar user={user}/>

                {user && <MyUserData user={user} setToggleUploadDesc={setToggleUploadDesc} descValue={descValue}/>}
                
            </div> 

            <div className="user-footer d-flex align-items-center" style={{height :'80px'}}>
                
                <button className="btn btn-danger" onClick={() => {removeCookies('token'), navigator('/authentication' , {replace : true})}}>Log Out</button>
            
            </div>


            <Footer />
            
        </div>
    )
}


export default MyUser; //exporting component