const CreatePostsBackground = ( { setToggleCreatePosts, toggleCreatePosts } ) => {
    return (
        <div className="create-posts-container-background position-fixed top-25 w-100 h-100 container-fluid bg-dark start-0 top-0 opacity-50" onClick={() => setToggleCreatePosts(!toggleCreatePosts)}></div>
    )
}

export default CreatePostsBackground