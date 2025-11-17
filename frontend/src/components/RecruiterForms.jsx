const RecruiterForms = ( { setToggleUploadTags, tags } ) => {
    return (
        <div className="recruiter-forms-container  d-flex flex-column gap-2 my-2 " >

            <div className="tags">
                
                <span>Your Tags : </span>
            
                <div className="d-flex flex-wrapper">
                    {tags ? tags.map((tag , tagId) => (
                    <span className="bg-success text-white m-1  p-2 rounded-2" key={tagId}>{tag}</span>
                )) : <span>no tags yet</span>}
                </div>
                
                <span className="bg-primary text-white rounded-2 p-1 fs-6 m-1" onClick={() => setToggleUploadTags(true)}>{tags.length < 1  ? 'Add Tags...' : 'Edit...'}</span>
            
            </div>

        </div>
    );
};//component displays recruiters tags on personal user page 

export default RecruiterForms;//exporting component