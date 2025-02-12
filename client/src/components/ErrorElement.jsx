import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const err = useRouteError();
  console.log(err);

  return <h3>There Was an Error</h3>;
};
export default ErrorElement;
