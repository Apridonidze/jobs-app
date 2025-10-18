const RecruiterForms = ( { setToggleUploadTags, tags } ) => {
    return (
        <div className="recruiter-forms-container w-50" >
            
            {tags.map((tag , tagId) => (
                <span key={tagId}>{tag}</span>
            ))}
            <span onClick={() => setToggleUploadTags(true)}>Add More...</span>

        </div>
    )
}

export default RecruiterForms