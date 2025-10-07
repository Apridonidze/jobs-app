import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import axios from "axios"
import NavBar from "../navbar/NavBar"

import Posts from "../posts/Posts"
import FindJobs from "../components/FindJobs"
import CreateJobs from "../components/CreateJobs"
import Footer from "../components/Foooter"

const Main = () => {

    const [togglePosts, setTogglePosts] = useState(false)
    const [toggleFindJobs, setFindJobs] = useState(false)
    const [toggleCreateJobs, setCreateJobs] = useState(false)
    
    const MY_USER_API = 'http://localhost:8080/my-user' //move to .env

    const [cookies, setCookies , removeCookies] = useCookies(['token'])

    const [user,setUser] = useState(null)

    useEffect(() => {

        axios
        .get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => {
            const userData = resp.data.data[0]
            setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})
        })
        .catch(err => console.log(err))

    },[])
    //if error reset cookies and navigate user to authentication page 


    return(
        <div className="main-container container">
            {/** check if user has finished their page , (first step it to just sign up ,after that they need to finish their profile (add avatar, add about me , add resume file))*/}

            <NavBar user={user} setTogglePosts={setTogglePosts} setFindJobs={setFindJobs} setCreateJobs={setCreateJobs}/>

            {togglePosts && <Posts />}
            {toggleFindJobs && <FindJobs />}
            {toggleCreateJobs && <CreateJobs />}

            <Footer />
        </div>
    )
}

//add titles to this page
export default Main