import axios from "axios"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

const SeeMore = ( {toggleSeeMore} ) => {

    const [ cookies ] = useCookies(['token'])
    const JOBS_URL = 'http://localhost:8080/jobs/user-jobs'

    useEffect(() => {
        const fetchJob = async() => { 
            try{
                await Promise.all([
                axios.get(`${JOBS_URL}/${toggleSeeMore.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => console.log(resp))
            ])
            
            }catch(err){
                console.log(err)
            }
        }

        fetchJob()
    },[])

    return(
        <div className="see-more-container position-fixed bg-white">
            {toggleSeeMore.job_id}
        </div>
    )
}

export default SeeMore