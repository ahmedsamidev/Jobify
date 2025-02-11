import Wrapper from "../assets/wrappers/JobsContainer";
import { useJobsCotext } from "../pages/AllJobs";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const {
    data: { jobs, totalJobs, numberOfPages, page },
    params,
  } = useJobsCotext();
  console.log(jobs);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs To display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs?.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs?.map((job) => {
          return <Job key={job._id} {...job}></Job>;
        })}
      </div>
      {numberOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
