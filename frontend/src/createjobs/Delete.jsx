import axios from "axios"
import { useCookies } from "react-cookie"
import '../main.css'
const Delete = ( { toggleDelete , setToggleDelete } ) => {

    const [cookies] = useCookies(['token'])
    const DELETE_JOB_URL = 'http://localhost:8080/jobs/delete-job';

    const handleDeleteJob = async () => {
        
        try{

            await Promise.all([
                axios.delete(`${DELETE_JOB_URL}/${toggleDelete.job_id}` , {headers : {Authorization : `Bearer ${cookies.token}`}} )
                .then(resp => {console.log(resp), window.location.reload()})
            ])

        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="delete-container position-fixed bg-white text-center p-3 rounded-2 " >
            <h3>Are You Sure ?</h3>
            <div className="buttons">
                <button className="btn btn-danger btn-md" onClick={() => handleDeleteJob()}>Yes</button>
                <button className="btn border btn-md" onClick={() => setToggleDelete({status: false , job_id : false})}>No</button>
            </div>
        </div>
    )
}


export default Delete