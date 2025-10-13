import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

const MyJobs = () => {

    const JOBS_URL = 'http://localhost:8080/jobs'

    const [cookies,setCookies,removeCookies] = useCookies(['token'])

    useEffect(() => {
        axios.get(JOBS_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})
        .then(resp => console.log(resp.data.message))
        .catch(err => console.log(err.response.data.error))
    },[])

    return (
        <div className="my-jobs-container">
            my jobs
        </div>
    )
}

export default MyJobs