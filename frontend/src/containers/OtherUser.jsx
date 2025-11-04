import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { replace, useNavigate, useParams } from "react-router-dom"
import OtherUserData from "./OtherUserData"

const OtherUser = () => {

    const { userId } = useParams()
    const [ cookies ] = useCookies(['token'])
    const navigator = useNavigate()

    const [userData ,setUserData] = useState(null)

    const USER_URL = 'http://localhost:8080/user/user' // move to .env

    useEffect(() => {

        const FetchUserData = async () => {

            try{

                await Promise.all([
                    axios.get(`${USER_URL}/${userId}` , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        const message = resp.data.message
                        const status = resp.data.status
                        const data = resp.data.data
                        const myuser = resp.data.myuser

                        if(!status) navigator('*', {replace : true})


                        if(myuser) navigator('/my-account', {replace  : true})

                        setUserData(data)
                        
                        

                    })
                ])

            }catch(err){

                console.log(err)

            }

        }

        FetchUserData()

    },[])

    //user, user_avatar, user_desc, user_roles, user_technologies

    return (
        <div className="other-user-container">

            {userData && <OtherUserData userData={userData} />}
          

        </div>
    )
}


export default OtherUser