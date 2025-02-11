import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFoundImage from "../assets/images/not-found.svg";
const Error = () => {
  const err = useRouteError();
  console.log(err);

  if (err.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFoundImage} alt="not Found" />
          <h3>ohh! Page Not Found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h1>SomeThing went Wrong</h1>
      </div>
    </Wrapper>
  );
};
export default Error;
