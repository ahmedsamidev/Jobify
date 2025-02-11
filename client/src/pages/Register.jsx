import { Form, Link, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const { data: registerResponse } = await customFetch.post(
      "/auth/register",
      data
    );
    toast.success(registerResponse.message);
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow labelText="Name" name="name" type="text" />
        <FormRow labelText="Last Name" name="lastName" type="text" />
        <FormRow labelText="Email" name="email" type="email" />
        <FormRow labelText="Location" name="location" type="text" />
        <FormRow labelText="Password" name="password" type="password" />
        <SubmitBtn className="form-btn" />
        <p>
          Already a Member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
