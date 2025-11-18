import axios from "axios";
import { useCookies } from "react-cookie";
import {  useNavigate, useParams } from "react-router-dom"; //importing react libraries

import { useEffect, useState } from "react"; //importing react hooks

import Error from "../alerts/Error";
import OtherUserData from "./OtherUserData"; //importing react component

const OtherUser = () => {

    const [ cookies ] = useCookies(['token']); //cookies

    const { userId } = useParams(); //hook that gets url parameter when visitin user page via user_id
    const USER_URL = 'http://localhost:8080/user/user'; //api url to fetch user data
    
    const [userData ,setUserData] = useState(null); //state to store user data from api
    const navigator = useNavigate(); //navigator to navigate user via pages

    const [toggleError,setToggleError] = useState(false) ; //state to toggle Error component

    useEffect(() => {

        const FetchUserData = async () => {

            try{

                await axios.get(`${USER_URL}/${userId}` , {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => {
                    const message = resp.data.message; //data success message
                    const status = resp.data.status; //data success status 
                    const data = resp.data.data; //data variable
                    const myuser = resp.data.myuser; //checks if visiting user user_id === my_id

                    if(!status) navigator('*', {replace : true}); //if we wont get user it navigates us to main page

                    if(myuser) navigator('/my-account', {replace  : true}); //if visiting account is my account then it navigates us to my-account route

                    setUserData(data); //else it sends user data in state
                    setToggleError(false); //untoggles erorr component if we get data successfully

                    })


            }catch(err){

                console.log(err) ; //consoles error
                setToggleError(true); //toggles error compomnent if error occurs

            };

        };

        FetchUserData(); //declearing variable

    },[]) ; //function mounts once page is loaded


    return (
        <div className="other-user-container">

            {toggleError && <Error setToggleError={setToggleError}/>}

            {userData && <OtherUserData userData={userData} />}
          

        </div>
    );
};

document.title = `Jobs App `; //title for page

export default OtherUser; //exporting component