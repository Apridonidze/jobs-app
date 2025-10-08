import CreatePosts from './CreatePosts'
const Posts = () => {
    return(
        <div className="posts-container">
            
            {/**toggle createPosts background here (dark background) so when user clicks it createpost will be closed (also clear input of createposts)*/}
            <CreatePosts />
           {/**add everyone elses posts here */}
        </div>
    )
}

export default Posts