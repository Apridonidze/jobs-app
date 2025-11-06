import { useEffect, useState } from "react"
import axios from 'axios'

import { useCookies } from 'react-cookie'
import JobHolder from "./JobHolder"

const Applied = () => {

    const [cookies] = useCookies(['token'])
    const MY_APPLIED_JOBS_URL = 'http://localhost:8080/applied/my-applied-jobs'
    const MY_USER_API = 'http://localhost:8080/user/my-user' //move to .env
    const [appliedJobList,setAppliedJobList] = useState(null)
    const [user, setUser] = useState()

    useEffect(() => {
        const FetchUserJobs = async() => {

            try{

                await Promise.all([
                    axios.get(MY_APPLIED_JOBS_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) setAppliedJobList(null)
                        else setAppliedJobList(resp.data)
                    }),
                    axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {const userData = resp.data  ; setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})})

                ])
                
            }catch(err){
                console.log(err)
            }

        }

        FetchUserJobs()
    },[])

    return (
        <div className="applied-container">
            <h1>Your Applied Jobs:</h1>
            {appliedJobList !== null && user && appliedJobList.length > 0 ? appliedJobList.map(job => 
                <JobHolder job={job} user={user}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    )
}


export default Applied