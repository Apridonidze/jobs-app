import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useParams } from "react-router-dom"

const OtherUser = () => {

    const { userId } = useParams()
    const {cookies} = useCookies(['token'])
    const USER_URL = 

    useEffect(() => {

        const FetchUserData = async () => {

            try{

                await Promise.all([
                    axios.get(`${USER_URL}/${userId}` , {headers : `${cookies.token}`})
                    .then(resp => console.log(resp.data))
                ])

            }catch(err){
                console.log(err)
            }

        }

        FetchUserData()

    },[])

    return (
        <div className="other-user-container">
            other user
            <p>User ID: {userId}</p>
        </div>
    )
}


export default OtherUser