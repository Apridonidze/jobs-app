const EmployeeForms = ( { setToggleUploadTechnologies , technologies,  roles ,setToggleUploadRole  } ) => {
    return(

        <div className="employee-forms-container d-flex flex-column gap-3 ">

            <div className="role-container">

                <span className="fs-5">I Am a :</span>

                    {roles && roles.map((role , roleId) => (
                    <span className="bg-success text-white fs-6 p-1 rounded-2 m-2 col w-100" key={roleId}>{role}</span>
                ))}
            
                
                <span className="bg-primary text-white rounded-2 p-1 fs-6" onClick={() => setToggleUploadRole(true)}>{roles && roles.length < 1 ? 'Add Role...' : 'Edit...'}</span>



            </div>

            <div className="technologies-container">
                
                <span>Your Technologies:</span>
            
                {technologies && technologies.map((technology , technologyId) => (
                    <span className="bg-success text-white" key={technologyId}>{technology}</span>
                ))}
            
                <span className="bg-primary text-white" onClick={() => setToggleUploadTechnologies(true)}>{technologies && technologies.length === 0 ? 'Add Technologies...' : 'Edit...'}</span>
            
            </div>
            

        </div>
    );
};


export default EmployeeForms; //exporting component