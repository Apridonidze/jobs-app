const RecruiterForms = ( { setToggleUploadTags, tags } ) => {
    return (
        <div className="recruiter-forms-container w-50" >

            <span>Your Tags : </span>
            {tags.map((tag , tagId) => (
                <span className="bg-success text-white" key={tagId}>{tag}</span>
            ))}
            <span className="bg-primary text-white" onClick={() => setToggleUploadTags(true)}>{tags.length < 1 ? 'Add Tags...' : 'Edit...'}</span>

        </div>
    )
}

export default RecruiterForms