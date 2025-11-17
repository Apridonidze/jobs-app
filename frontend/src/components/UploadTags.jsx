import axios from "axios"
import { useCookies } from "react-cookie"

import '../main.css'

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
        <div className="upload-tags-container position-fixed bg-white p-3 rounded-2 fs-5 d-flex flex-column">
            <form className="my-2" onSubmit={handleTags}>
               
                <select onChange={(e) => {setTags(tags => [...tags,e.target.value]) ; if(e.target.value === 'blank') setTags(tags) ; if(tags.includes(e.target.value)) setTags(tags) ; return}} className="form-control">
                    <option value="blank">Add Tags To Attract Employees In Same Scope</option>
                    <option value="Web Developing">Web Developing</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="Dekstop App Developing">Dekstop App Developing</option>
                    <option value="Dekstop App Engineering">Dekstop App Engineering</option>
                    <option value="Mobile App Developing">Mobile App Developing</option>
                    <option value="Mobile App Engineering">Mobile App Engineering</option>
                </select>

                <div className="slected-tags d-flex flex-wrap gap-2 my-2 p-2 border rounded-3">
                    {tags.map((tag, tagId) => (
                        <span className="bg-primary text-white px-3 py-2 rounded-3 flex-grow-1 text-center shadow-sm" key={tagId} onClick={() => {setTags(tags.filter(t => t !== tag))}}>{tag}</span>
                    ))}
                </div>

                <input  type="submit" className="btn btn-success w-100" value="Upload Tags" />

            </form>
        </div>
    )
}


export default UploadTags