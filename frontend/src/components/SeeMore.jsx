
const SeeMore = ({ user, toggleSeeMore, job }) => { 

  console.log(job)

  return(
    <div className="see-more-container position-fixed bg-white w-50">
      <h1>{job.job_title}</h1>
    </div>
  )

};

export default SeeMore;
