import axios from "axios"
import { useCookies } from "react-cookie"
import { useEffect, useRef, useState } from "react"

const PostsInput = () => {
    
    const [cookies,setCookies,removeCookies] = useCookies(['token'])

    const [postInput, setPostInput] = useState('')
    const [postInputErr, setPostInputErr] = useState('')

    const postInputRef = useRef(null)

    const POSTS_API_URL = 'http://localhost:8080/new-posts'

    const SubmitPost = async (e) => {

        e.preventDefault()

//if input is valid send to backend in posts route with token headers and validate tokens in backend
//then add post in posts with users username and etc //insert post create time and do not make user create new post if post is created 5 minutes ago

        let isValid 
        let data = {}

        if(postInput.trim().length == 0 || postInput.trim() == '' || postInput.trim() == ' ' || postInput.trim() == null || postInput.trim() == undefined){
            
            isValid = false; 
            setPostInputErr('This Field Should Not Be Empty'); 

            postInputRef.current.classList.add('is-invalid');
            postInputRef.current.classList.remove('is-valid') 
        }else {
            
            //** select tags from text (split input and check if any of the variable has #infront and add into data object as a tags : ${tagFromInput}) */
        isValid = true; 
        setPostInputErr(''); 

        postInputRef.current.classList.add('is-valid');
        postInputRef.current.classList.remove('is-invalid')

        }

        data = {...data , userToken : cookies.token , postInput : postInput }
       
        if(isValid){

            //put this function in try/catch block

            axios
            .post(POSTS_API_URL, data , {headers : {Authorization : `Bearer ${cookies.token}`}})
            .then(resp => console.log(resp)) //fetch message from resp and display it in PostMessages.jsx , close input window when message will be dissapeard (in 3 seconds)
            .catch(err => console.log(err)) //fetch message from resp and display it in PostMessages.jsx , close PostMessage window(in 3 seconds) ; add styling to input filed
        }


    }



    useEffect(() => {SubmitPost},[])

    return(
        <div className="posts-input-container container position-absolute border border-1 bg-white">
            <form onSubmit={SubmitPost}>
            
                <input className="form-control" type="text" onChange={e => setPostInput(e.target.value)} value={postInput} placeholder="Add Your Post..." ref={postInputRef}/>
                <button className="btn btn-success">Create Post</button>
            
            </form>
            {postInputErr}
        </div>
    )
}


export default PostsInput