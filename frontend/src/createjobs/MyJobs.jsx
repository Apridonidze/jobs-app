import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import MyJob from "./MyJob"
import SeeMore from "./SeeMore"
import Delete from "./Delete"

const MyJobs = ( { yourJobs , setToggleSeeMore } ) => {

    console.log(yourJobs)
    

    return (
        <div className="my-jobs-container d-flex flex-column">

            


            <h1>Jobs Created By You: </h1>
            {yourJobs ? yourJobs.reverse().map(job => <MyJob job={job} setToggleSeeMore={setToggleSeeMore}/>) :  <h1>asdasd</h1> }
                       
        </div>
)}

export default MyJobs