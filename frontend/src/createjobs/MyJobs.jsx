import MyJob from "./MyJob"

const MyJobs = ( { yourJobs , setToggleSeeMore } ) => {

    return (
        <div className="my-jobs-container d-flex flex-column">

            


            <h1>Jobs Created By You: </h1>
            {yourJobs ? yourJobs.reverse().map(job => <MyJob job={job} setToggleSeeMore={setToggleSeeMore}/>) :  <h1>No Jobs Yet.</h1> }
                       
        </div>
)}

export default MyJobs