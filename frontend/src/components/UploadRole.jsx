const UploadRole = ( { setRoles, roles} ) => {
    return(
        <div className="upload-role-container position-fixed bg-white">
            <select onChange={(e) => {setRoles(role => [...role, e.target.value]) ;if(e.target.value === 'blank') setRoles(roles) ; if(roles.includes(e.target.value)) setRoles(roles) ; return}}>        
                <option value="blank">I Am A:</option>
                <option value="Figma Designer">Figma Designer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="AI Enginner">AI Enginner</option>
                <option value="Cybersecurity Enginner">Cybersecurity Developer</option>
                <option value="DevOps Enginner">DevOps Enginner</option>
                <option value="Cloud Enginner">Cloud Enginner</option>
                <option value="Manual Tester">Manual Tester</option>
                <option value="Automation Tester">Automat Tester</option>
            </select>

            <div className="role-list">
                {roles.map((role,roleId) => (
                    <span key={roleId} onClick={() => setRoles(roles.filter(r => r !== role))}>{role}</span>
                ))}
            </div>

        </div>
    )
}


export default UploadRole