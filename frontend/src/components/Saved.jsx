import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

import JobHolder from './JobHolder'
const Saved = () => {

    const [cookies] = useCookies(['token'])

    const SAVED_URL = 'http://localhost:8080/saved/my-saved-jobs'
    const MY_USER_API = 'http://localhost:8080/user/my-user' //move to .env

    const [user , setUser] = useState()
    const [jobs , setJobs] = useState(null)
    const [status , setStatus] = useState(null)

    useEffect(() => {
        const fetchSaved = async() => {
            try{

                await Promise.all([
                    axios.get(SAVED_URL , {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {
                        if(resp.status === 204) setJobs([])
                        else setJobs(resp.data)    
                    }),
                    axios.get(MY_USER_API, {headers : {Authorization : `Bearer ${cookies.token}`}})
                    .then(resp => {const userData = resp.data  ; setUser({role : userData.user_role , name : userData.user_name, surname : userData.user_surname , birthDate : userData.user_birthdate, gender : userData.user_gender})})

                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchSaved()
    },[])

    return (
        <div className="saved-container">
            <h1>Your Saved Jobs:</h1>
           {jobs !== null && user && jobs.length > 0 ? jobs.map(job => 
                <JobHolder job={job} user={user}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    )
}


export default Saved