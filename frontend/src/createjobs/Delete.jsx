import axios from "axios"
import { useCookies } from "react-cookie"

const Delete = ( { setToggleDelete, toggleSeeMore} ) => {

    const [cookies] = useCookies(['token'])
    const DELETE_JOB_URL = 'http://localhost:8080/jobs/delete-job';

    const handleDeleteJob = async () => {
        
        try{

            await Promise.all([
                axios.delete(`${DELETE_JOB_URL}/${toggleSeeMore.job_id}` , {headers : {Authorization : `Bearer ${cookies.token}`}} )
                .then(resp => {console.log(resp), window.location.reload()})
            ])

        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="delete-container position-fixed bg-white">
            <h1>Are You Sure</h1>
            <div className="buttons">
                <button onClick={() => handleDeleteJob()}>Yes</button>
                <button onClick={() => setToggleDelete(false)}>No</button>
            </div>
        </div>
    )
}


export default Delete