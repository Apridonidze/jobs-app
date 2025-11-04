import { useParams } from "react-router-dom"

const OtherUser = () => {

    const { userId } = useParams()


    console.log(userId)

    return (
        <div className="other-user-container">
            other user
                  <p>User ID: {userId}</p>
        </div>
    )
}


export default OtherUser