import MyJob from "./MyJob"; //importing react component

const MyJobs = ( { yourJobs , setToggleSeeMore } ) => {

    return (
        <div className="my-jobs-container container-fluid d-flex flex-column justify-content-start">

            <div className="my-jobs-header">
                
                <h1>Jobs Created By You: </h1>
            
            </div>

            <div className="my-jobs-body container-fluid ">

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                    {yourJobs ? yourJobs.reverse().map(job => <MyJob job={job} setToggleSeeMore={setToggleSeeMore}/>) :  <h1>No Jobs Yet.</h1> }
                   
                </div>

            </div>
                       
        </div>
    );
}; //component checks if jobs are already fetched if so it returns No Jobs Yet text if user has not created jobs yet else it returns reversed jobs lists (first one is latest created job) in MyJob components

export default MyJobs; //exporting component