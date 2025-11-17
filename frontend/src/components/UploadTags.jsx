import axios from "axios"
import { useCookies } from "react-cookie"

const UploadTags = ( { tags , setTags } ) => {
    
    const [ cookies ]  = useCookies(['token'])

    const UPLOAD_TAGS_URL = 'http://localhost:8080/tags/upload-tags'

    const handleTags = async(e) => {
        e.preventDefault()

        if(tags.length < 1){
        return    //return error here
        }

        
        try{
            
            await Promise.all([
                axios.post(UPLOAD_TAGS_URL , {tags : tags}, {headers: {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => console.log(resp)) //add success message toggle here
            ])
            
        }catch(err){
            console.log(err) //add error message toggle here 
        }

    }

    return (
        <div className="upload-tags-container bg-white position-fixed">
            <form onSubmit={handleTags}>
               
                <select onChange={(e) => {setTags(tags => [...tags,e.target.value]) ; if(e.target.value === 'blank') setTags(tags) ; if(tags.includes(e.target.value)) setTags(tags) ; return}} className="form-control">
                    <option value="blank">Add Tags To Attract Employees In Same Scope</option>
                    <option value="Web Developing">Web Developing</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="Dekstop App Developing">Dekstop App Developing</option>
                    <option value="Dekstop App Engineering">Dekstop App Engineering</option>
                    <option value="Mobile App Developing">Mobile App Developing</option>
                    <option value="Mobile App Engineering">Mobile App Engineering</option>
                </select>

                <div className="slected-tags">
                    {tags.map((tag, tagId) => (
                        <span key={tagId} onClick={() => {setTags(tags.filter(t => t !== tag))}}>{tag}</span>
                    ))}
                </div>

                <input type="submit" className="btn btn-success" value="Upload Tags" />

            </form>
        </div>
    )
}


export default UploadTags