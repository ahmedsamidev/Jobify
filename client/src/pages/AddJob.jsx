import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import FormRowSelect from "../components/FormRowSelect.jsx";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn.jsx";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const res = await customFetch.post("/jobs", data);
      toast.success(res.data.message);
      await queryClient.invalidateQueries(["jobs"]);
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">form Title</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            label="job Status"
            optionsValues={JOB_STATUS}
            selectDefaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            label="job Type"
            optionsValues={JOB_TYPE}
            selectDefaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitBtn className="form-btn" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
