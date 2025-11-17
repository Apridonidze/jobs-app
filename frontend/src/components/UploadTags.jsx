import axios from "axios";
import { useCookies } from "react-cookie"; //importing react libraries

import '../main.css'; //importing css file

const UploadTags = ( { tags , setTags , setToggleError } ) => {
    
    const [ cookies ]  = useCookies(['token']); //cookies

    const UPLOAD_TAGS_URL = 'http://localhost:8080/tags/upload-tags'; //api to uplaod tags

    const handleTags = async(e) => {

        e.preventDefault(); //prevents page refresh when function triggers

        if(tags.length < 1)return;  //if tags legth === 0 function does nothing
        

        
        try{
            
            await axios.post(UPLOAD_TAGS_URL , {tags : tags}, {headers: {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => {console.log(resp) ; setToggleError(false)}) //sends tags to server and consoles response
            
            
        }catch(err){

            console.log(err); //consoles error
            setToggleError(true) ; //toggles error component if error occurs
        };

    }; //function triggers when ypload button is clicked

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
    );
};


export default UploadTags; //exporting component