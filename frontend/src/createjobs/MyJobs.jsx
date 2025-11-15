import MyJob from "./MyJob"; //importing react component

const MyJobs = ( { yourJobs , setToggleSeeMore } ) => {

    return (
        <div className="my-jobs-container d-flex flex-column">

            <h1>Jobs Created By You: </h1>

            {yourJobs ? yourJobs.reverse().map(job => <MyJob job={job} setToggleSeeMore={setToggleSeeMore}/>) :  <h1>No Jobs Yet.</h1> }
                       
        </div>
    );
}; //component checks if jobs are already fetched if so it returns No Jobs Yet text if user has not created jobs yet else it returns reversed jobs lists (first one is latest created job) in MyJob components

export default MyJobs; //exporting component