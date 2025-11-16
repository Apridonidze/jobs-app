import '../main.css'

const EmployeeForms = ( { setToggleUploadTechnologies , technologies,  roles ,setToggleUploadRole  } ) => {
    return(

        <div className="employee-forms-container d-flex flex-column gap-2 my-2 ">

            <div className="role-container">

                <span className="fs-5">I Am a :</span>

                <div className="d-flex flex-wrap">
                    {roles && roles.map((role , roleId) => (
                    <h6 className="bg-success text-white m-1  p-2 rounded-2 " key={roleId} >{role}</h6>
                ))}
            
                
                <span className="bg-primary text-white rounded-2 p-1 fs-6 m-1"  onClick={() => setToggleUploadRole(true)}>{roles && roles.length < 1 ? 'Add Role...' : 'Edit...'}</span>


                </div>

            </div>

            <div className="technologies-container">
                
                <span className="fs-5">Your Technologies:</span>
            
                <div className="d-flex flex-wrap justify-content-start align-items-center">
                    {technologies && technologies.map((technology , technologyId) => (
                    <span className="bg-success text-white m-1  p-2 rounded-2 "  key={technologyId}>{technology}</span>
                ))}
            
                <span className="bg-primary text-white rounded-2 p-1 fs-6 m-1" onClick={() => setToggleUploadTechnologies(true)}>{technologies && technologies.length === 0 ? 'Add Technologies...' : 'Edit...'}</span>
            
                </div>
            </div>
            

        </div>
    );
};


export default EmployeeForms; //exporting component