import axios from "axios";
import { useCookies } from "react-cookie"; 

import { useState,useEffect } from "react";

const MyJob = ( { job ,setToggleSeeMore} ) => {

    const [count,setCount] = useState(0);
    const [cookies] = useCookies(['token']);
    const APPLICANT_URL = 'http://localhost:8080/accept-decline/my-applicants';

    useEffect(() => {
        const fetchUserCount = async() => {
            try{

                await axios.get(`${APPLICANT_URL}/${job.job_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}}).then(res => setCount(res.data.length));

            }catch(err){
                console.log(err);
                setCount(0);
            }
        }

        fetchUserCount();
    },[]);

    return(
        <div className="my-job-container container py-2 px-3 border border-2 rounded-2 col d-flex flex-column w-50" key={job.job_id}>
            <h3 className="text-break">{job.job_title}</h3>
            <h4 className="text-break">{job.job_desc.length > 120 ? `${job.job_desc.slice(0,120)}...` : job.job_desc}</h4>
            <h4>applicants : {count}</h4>

            <button className="btn btn-primary" onClick={() => setToggleSeeMore({status:true , job_id : job.job_id})}>See More</button>
        </div>
    );
};


export default MyJob;