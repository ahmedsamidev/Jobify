import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    queryClient.invalidateQueries();
    try {
      const res = await customFetch.post("/auth/login", data);
      toast.success(res.data.message);
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);

      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const user = {
    email: "test@test.com",
    password: "secret123",
  };

  const loginTestUser = async () => {
    try {
      const res = await customFetch.post("/auth/login", user);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />

        <button type="button" className="btn btn-block" onClick={loginTestUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
