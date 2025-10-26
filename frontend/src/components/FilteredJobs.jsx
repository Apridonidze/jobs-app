import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const FilteredJobs = ( { jobs } ) => {

    //job_employeeList, job_technologies, generate based on this parameters 

    const [cookies] = useCookies(['token'])
    const [filteredJobs, setFilteredJobs] = useState([])

    useEffect(() => {

        const filterUserJobs = async() =>{

            const MY_USER_ROLE_URL = 'http://localhost:8080/roles/my-roles'
        const MY_USER_TECH_URL = 'http://localhost:8080/technologies/user-technologies'

        
        //import my technologies from technologies.js 
        //import my role from role.js
        //change temprary variables into this fetched variables  

        try{
            const [userTechs , userRole] = await Promise.all([
                axios.get(MY_USER_TECH_URL, {headers: {Authorization : `Bearer ${cookies.token}`}}),
                axios.get(MY_USER_ROLE_URL, {headers: {Authorization : `Bearer ${cookies.token}`}})])
                
                console.log(userTechs.data,userRole.data[0].user_roles )
            
        
        }catch(err){
            console.log(err)
        }

        const filtered = jobs.filter(job => job.job_technologies.includes('TypeScript') && job.job_employeeList.includes('Figma Designer'))
        setFilteredJobs(filtered)
        }

        filterUserJobs()

    },[])


    return(
        <div className="filtered-jobs-container">
            <h1>Jobs For You: </h1>
        </div>
    )
}


export default FilteredJobs