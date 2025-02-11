import Wrapper from "../assets/wrappers/JobInfo";

const jobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};
export default jobInfo;
