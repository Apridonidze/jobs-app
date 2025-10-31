import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import PendingJob from "./PendingJob"
import Applicant from './Applicant'
const Pendings = () => {

    const PENDINGS_URL = 'http://localhost:8080/applied/my-applicants'
    const [cookies] = useCookies(['token'])

    const [jobs ,setJobs] = useState([])
    const [applicants,setApplicant] = useState([])

    const [toggleSeeMore , setToggleSeeMore] = useState(false)

    useEffect(() => {

        const fetchPendings = async() =>{
            try{
                await Promise.all([
                axios.get(PENDINGS_URL, {headers : {Authorization : `Bearer ${cookies.token}`}})
                .then(resp => {setJobs(resp.data.job) ; setApplicant(resp.data.applicants)})
            ])
            }catch(err){
                console.log(err)
            }
        }


        fetchPendings()

    },[])


    return(
        <div className="pendings-container">
            <h1>Pendings For Your Jobs</h1>
           
            <div className="pendings-container">
                {jobs?.map(job => (
                
                <PendingJob job={job} applicants={applicants} setToggleSeeMore={setToggleSeeMore}/>
            ))}
            
            </div>
            
            {toggleSeeMore && <><div className="see-more-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleSeeMore(false)}></div> <div className="see-more-container container position-fixed bg-white top-50"><h1>job desc</h1></div></>}
            
            
        </div>
    )
}

export default Pendings