import { useEffect, useRef, useState } from "react"

const PostsInput = () => {

    let isValid
    let data = {}

    const [postInput, setPostInput] = useState('')
    const [postInputErr, setPostInputErr] = useState('')

    const postInputRef = useRef(null)

    const SubmitPost = (e) => {
        e.preventDefault()

//create fileters here 
//if input is valid send to backend in posts route with token headers and validate tokens in backend
//then add post in posts with users username and etc //insert post create time and do not make user create new post if post is created 5 minutes ago

        if(postInput.trim().length == 0){

        }

    }


    useEffect(() => {SubmitPost},[])

    return(
        <div className="posts-input-container container position-absolute border border-1 bg-white">
            <form onSubmit={SubmitPost}>
            
                <input className="form-control" type="text" onChange={e => setPostInput(e.target.value)} value={postInput} placeholder="Add Your Post..." ref={postInputRef}/>
                <button className="btn btn-success">Create Post</button>
            
            </form>
        </div>
    )
}


export default PostsInput