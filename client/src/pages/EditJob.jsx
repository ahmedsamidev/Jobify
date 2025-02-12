import { Form, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import FormRowSelect from "../components/FormRowSelect";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants";
import SubmitBtn from "../components/SubmitBtn";
import { useQuery } from "@tanstack/react-query";

const editJob = (params) => {
  return {
    queryKey: ["editJob"],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${params.id}`);
      return data.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editJob(params));
      return params;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to fetch job details. Please try again later."
      );
      console.error(error);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ params, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const res = await customFetch.patch(`/jobs/${params.id}`, data);
      toast.success(res.data.message);
      await queryClient.invalidateQueries(["jobs"]);
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error.response.data.message);
      return error;
    }
  };

const EditJob = () => {
  const { params } = useLoaderData();

  const {
    data: { job },
  } = useQuery(editJob(params));

  return (
    <Wrapper>
      <Form method="patch" className="form">
        <h4 className="form-title">edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            label="job Status"
            optionsValues={JOB_STATUS}
            selectDefaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            label="job Type"
            optionsValues={JOB_TYPE}
            selectDefaultValue={job.jobType}
          />
          <SubmitBtn className="form-btn" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
