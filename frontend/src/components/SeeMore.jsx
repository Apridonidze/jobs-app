import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import JobHolder from "./JobHolder"

const SeeMore = ( { toggleSeeMore, user } ) => {

    const [cookies] = useCookies(['token'])
    const [job,setJob] = useState(null)
    
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    return (
        <div className="see-more-container position-fixed bg-white" style={{zIndex: 1055}}>
            <h1>asdasdsadas</h1>
        </div>
    )
}


export default SeeMore