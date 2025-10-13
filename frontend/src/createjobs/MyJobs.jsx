import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

const MyJobs = () => {

    const [cookies,setCookies,removeCookies] = useCookies(['token'])

    useEffect(() => {
        axios.get('/add url here', {headers: {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    },[])

    return (
        <div className="my-jobs-container">
            my jobs
        </div>
    )
}

export default MyJobs