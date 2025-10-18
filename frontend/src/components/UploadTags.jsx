import { useState } from "react"

const UploadTags = () => {

    const [tags,setTags] = useState([])

    const handleTags = (e) => {
        e.preventDefault()
    }

    return (
        <div className="upload-tags-container bg-white position-fixed">
            <h1>Add Tags To Attract Employees In Same Scope</h1>

            <form onSubmit={handleTags}>
               
                <select onChange={(e) => setTags(tags => [...tags,e.target.value])}>
                    <option value="Web Developing">Web Developing</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="Dekstop App Developing">Dekstop App Developing</option>
                    <option value="Dekstop App Engineering">Dekstop App Engineering</option>
                    <option value="Mobile App Developing">Mobile App Developing</option>
                    <option value="Mobile App Engineering">Mobile App Engineering</option>
                </select>

                <div className="slected-tags">
                    {tags.map((tag, tagId) => (
                        <span key={tagId} onClick={() => setTags(tags.filter(t => t !== tag))}>{tag}</span>
                    ))}
                </div>

                <input type="submit" value="Upload Tags" />

            </form>
        </div>
    )
}


export default UploadTags