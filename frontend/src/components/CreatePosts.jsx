import { useEffect, useState } from "react"

const CreatePosts = () => {
    
    const [toggleCreatePosts,setToggleCreatePosts] = useState(false)
    const [postInput,setPostInput] = useState('')

    useEffect(() => {



    },[])

    return(
        <div className="create-posts-container container">
            <span>Create Your Post...</span>
            <button onClick={() => setToggleCreatePosts(!toggleCreatePosts)}>Add</button>

            {toggleCreatePosts && <input /> /**change input with component */}
        </div>
    )
}


export default CreatePosts