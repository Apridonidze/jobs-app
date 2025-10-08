import CreatePostsBackground from "./CreatePostsBackground"
import PostsInput from "./PostsInput"

import { useState } from "react"

const CreatePosts = () => {
    
    const [toggleCreatePosts,setToggleCreatePosts] = useState(false)

    return(
        <div className="create-posts-container container">
            <span>Create Your Post...</span>
            <button onClick={() => setToggleCreatePosts(!toggleCreatePosts)}>Add</button>

            {toggleCreatePosts && <> <CreatePostsBackground setToggleCreatePosts={setToggleCreatePosts} toggleCreatePosts={toggleCreatePosts}/> <PostsInput /> </>}
        </div>
    )
}


export default CreatePosts