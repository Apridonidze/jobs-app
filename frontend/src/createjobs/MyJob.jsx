import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import { useState,useEffect } from "react"; //importing react hooks

const MyJob = ( { job ,setToggleSeeMore , setToggleError} ) => {

    const [count,setCount] = useState(0); //state for applicants count
    const [cookies] = useCookies(['token']); //cookies
    const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants'; //api url that fetches applicants count

    useEffect(() => {
        const fetchUserCount = async() => {
            try{

                await axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(res => {setCount(res.data.length) ; setToggleError(false)}); //awaits response from server about applicants and disables error component

            }catch(err){
                console.log(err); //consoles error message
                setToggleError(true) ; //toggles error message component
                setCount(0);//sets count to 0 if error occurs
            };
        };

        fetchUserCount(); //calls function
    },[]);//function triggers when MyJob component is mounted

    return(
        <div className="my-job-container py-2 px-3 border border-2 rounded-2" key={job.job_id}>

            <h3 className="text-break">{job.job_title}</h3>
            <h4 className="text-break">{job.job_desc.length > 120 ? `${job.job_desc.slice(0,120)}...` : job.job_desc}</h4>
            <h4>applicants : {count}</h4>

            <button className="btn btn-primary" onClick={() => setToggleSeeMore({status:true , job_id : job.job_id})}>See More</button>

        </div>
    );
};


export default MyJob; //exporting component