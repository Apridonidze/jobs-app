const RecruiterForms = ( { setToggleUploadTags } ) => {
    return (
        <div className="recruiter-forms-container" >
            {/**map tags here from axiios (crate it in myusersidebar.jsx) */}
            <span onClick={() => setToggleUploadTags(true)}>Add More...</span>

        </div>
    )
}

export default RecruiterForms