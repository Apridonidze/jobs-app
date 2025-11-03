const Delete = ( { setToggleDelete } ) => {
    return (
        <div className="delete-container position-fixed bg-white">
            <h1>Are You Sure</h1>
            <div className="buttons">
                <button >Yes</button>
                <button onClick={() => setToggleDelete({status : null, job_id : null})}>No</button>
            </div>
        </div>
    )
}


export default Delete