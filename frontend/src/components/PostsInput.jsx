import { useState } from "react"

const PostsInput = () => {

    const [postInput, setPostInput] = useState('')

    const SubmitPost = (e) => {
        e.preventDefault()




    }

    return(
        <div className="posts-input-container container position-absolute border border-1 bg-white">
            <form onSubmit={SubmitPost}>
            
                <input className="form-control" type="text" onChange={e => setPostInput(e.target.value)} value={postInput} placeholder="Add Your Post..."/>
                <button className="btn btn-success">Create Post</button>
            
            </form>
        </div>
    )
}


export default PostsInput