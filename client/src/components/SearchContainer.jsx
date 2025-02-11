import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useJobsCotext } from "../pages/AllJobs";
import _ from "lodash";
// import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  const {
    params: { search, jobStatus, jobType, sort },
  } = useJobsCotext();
  const submit = useSubmit();

  const handleChange = _.debounce((event) => {
    submit(event.target.form);
  }, 1000);
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            onchange={(e) => handleChange(e)}
            type="search"
            name="search"
            defaultValue={search}
          />
          <FormRowSelect
            label="Job Status"
            name="jobStatus"
            optionsValues={["all", ...Object.values(JOB_STATUS)]}
            selectDefaultValue={jobStatus}
            onchange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            label="Job Type"
            name="jobType"
            optionsValues={["all", ...Object.values(JOB_TYPE)]}
            selectDefaultValue={jobType}
            onchange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowSelect
            label="Sort"
            name="sort"
            optionsValues={[...Object.values(JOB_SORT_BY)]}
            selectDefaultValue={sort}
            onchange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          <SubmitBtn className="form-btn" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
