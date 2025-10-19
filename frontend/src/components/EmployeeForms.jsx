const EmployeeForms = ( { setToggleUploadTechnologies , technologies  } ) => {
    return(
        <div className="employee-forms-container">
            <span>Your Technologies:</span>
            {technologies.map((technology , technologyId) => (
                <span className="bg-success text-white" key={technologyId}>{technology}</span>
            ))}
            <span className="bg-primary text-white" onClick={() => setToggleUploadTechnologies(true)}>{technologies.length < 1 ? 'Add Technologies...' : 'Edit...'}</span>

        </div>
    )
}


export default EmployeeForms