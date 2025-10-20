const EmployeeForms = ( { setToggleUploadTechnologies , technologies, roles ,setToggleUploadRole  } ) => {
    return(
        <div className="employee-forms-container">

            
            <div className="">

                <span>I Am a :</span>

                {roles && roles.map((role , roleId) => (
                    <span className="bg-success text-white" key={roleId}>{role}</span>
                ))}
            
                <span className="bg-primary text-white" onClick={() => setToggleUploadRole(true)}>{roles && roles.length < 1 ? 'Add Role...' : 'Edit...'}</span>



            </div>

            <div className="">
                
                <span>Your Technologies:</span>
            
                {technologies && technologies.map((technology , technologyId) => (
                    <span className="bg-success text-white" key={technologyId}>{technology}</span>
                ))}
            
                <span className="bg-primary text-white" onClick={() => setToggleUploadTechnologies(true)}>{technologies && technologies.length < 1 ? 'Add Technologies...' : 'Edit...'}</span>
            
            </div>
            

        </div>
    )
}


export default EmployeeForms