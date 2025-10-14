const UploadDesc = () => {
    return(
        <div className="upload-desc-container  container position-fixed bg-white">


            <span>Add Infromation About You : Who Are You, What Are You Doing, etc</span>

            <form>

                <div className="form-floating">
                
                    <textarea className="form-control" style={{resize : 'none' , height:  '300px'}} type="text" name="desc" placeholder="Add About Me..."/>
                    <label htmlFor="desc">Add About Me...</label>
                
                </div>

                <input type="submit" className="btn btn-success" value="Upload" />
            
            </form>
        </div>
    )
}

export default UploadDesc