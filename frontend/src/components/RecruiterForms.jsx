const RecruiterForms = ( { setToggleUploadTags, tags } ) => {
    return (
        <div className="recruiter-forms-container w-50" >

            {tags.map((tag , tagId) => (
                <span className="bg-success text-white" key={tagId}>{tag}</span>
            ))}
            <span className="bg-primary text-white" onClick={() => setToggleUploadTags(true)}>Edit...</span>

        </div>
    )
}

export default RecruiterForms