const FilteredJob = ( { filteredJob , filteredJobId , key } ) => {
    return (
        <div className="filtered-job-container col-5 border border-1 justify-content-between p-2" key={filteredJobId}>
            <div className="filtered-job-header">
            
                <h4 className="text-break">{filteredJob.job_title}</h4>
                <h6 className="text-break">{filteredJob.job_desc}</h6>
            
            </div>
            
            <div className="filtered-job-footer">
                
                <h6>Looking For : {filteredJob.job_employeeList}</h6>
                <h6>Technologies : {filteredJob.job_technologies}</h6>
            
            </div>

           <div className="buttons row d d-flex flex-column gap-2">
                <div className="buttons-header d d-flex gap-2 col">
                    <button className="btn btn-success w-50">Apply</button>
                    <button className="btn border border-2 border-success w-50">Save</button>
                </div>
                <div className="buttons-footer col">
                    <button className="btn btn-primary w-100">See More...</button>
                </div>
           </div>
        </div>
    )
}
export default FilteredJob