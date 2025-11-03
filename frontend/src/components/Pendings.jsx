import axios from "axios"
import { useState, useEffect } from "react"
import {  } from "react"
import { useCookies } from "react-cookie"

import PendingJob from "./PendingJob"
import AccpetDecline from "./AcceptDecline"
const Pendings = () => {

    const PENDINGS_URL = 'http://localhost:8080/applied/my-applicants'
    const [cookies] = useCookies(['token'])

    const [jobs ,setJobs] = useState([])
    const [applicants,setApplicant] = useState([])
    const [toggleAcceptDecline, setToggleAcceptDecline] = useState({status:false , job_id : null})


    useEffect(() => {
        
    const PENDINGS_URL = 'http://localhost:8080/applied/my-applicants'

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
                    <>
                        {toggleAcceptDecline.status && <> <div className="accept-decline-background bg-dark opacity-50 position-fixed w-100 h-100 top-0 start-0" onClick={() => setToggleAcceptDecline({status:false , job_id : null})}></div> <AccpetDecline toggleAcceptDecline={toggleAcceptDecline} job={job} applicants={applicants}/></>}
                        <PendingJob job={job} applicants={applicants} setToggleAcceptDecline={setToggleAcceptDecline}/>
                    </>    
                ))}
            
            </div>
            
            
        </div>
    )
}

export default Pendings