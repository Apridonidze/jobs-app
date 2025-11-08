import { useEffect, useState } from "react"
import axios from 'axios'

import { useCookies } from 'react-cookie'
import JobHolder from "./JobHolder"

const Applied = ( {user , jobs }) => {
    
    return (
        <div className="applied-container">
            <h1>Your Applied Jobs:</h1>
            {jobs !== null && user && jobs.length > 0 ? jobs.map(job => 
                <JobHolder job={job} user={user}/>
            ) : <h1>No Jobs Applied Yet</h1>}
        </div>
    )
}


export default Applied