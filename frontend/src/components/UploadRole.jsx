import axios from "axios"
import { useCookies } from "react-cookie"

const UploadRole = ( { setRoles, roles} ) => {

    const UPLOAD_ROLE_URL = 'http://localhost:8080/roles/upload-roles'

    const [cookies] = useCookies(['token'])


    const handleUploadRole = (e) => {

        e.preventDefault()

        if(roles.length < 1) return

        try{
            
            axios.post(UPLOAD_ROLE_URL , {roles : roles}, {headers : {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => console.log(resp))

            //add message toggle variables here and countdown to toggle down windows when data is posted successfully

        }catch(err){
            console.log(err)
            
            //add error message toggle variables here when data is not posted 
        }

    }


    return(
        <div className="upload-role-container position-fixed bg-white">
            <form onSubmit={handleUploadRole}>
                <select onChange={(e) => {setRoles(role => [...role, e.target.value]) ;if(e.target.value === 'blank') setRoles(roles) ; if(roles.includes(e.target.value)) setRoles(roles) ; return}}>        
                    <option value="blank">I Am A:</option>
                    <option value="Figma Designer">Figma Designer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">Fullstack Developer</option>
                    <option value="AI Enginner">AI Enginner</option>
                    <option value="Cybersecurity Enginner">Cybersecurity Developer</option>
                    <option value="DevOps Enginner">DevOps Enginner</option>
                    <option value="Cloud Enginner">Cloud Enginner</option>
                    <option value="Manual Tester">Manual Tester</option>
                    <option value="Automation Tester">Automat Tester</option>
                </select>

                <div className="role-list">
                    {roles.map((role,roleId) => (
                        <span key={roleId} onClick={() => setRoles(roles.filter(r => r !== role))}>{role}</span>
                    ))}
                </div>

                <input type="submit" value="Upload Your Role" />

            </form>

        </div>
    )
}


export default UploadRole