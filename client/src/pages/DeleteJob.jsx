import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    const res = await customFetch.delete(`/jobs/${params.id}`);
    toast.success(res.message ?? "Job Deleted Successfully");
    return redirect("../all-jobs");
  } catch (error) {
    toast.error(error.request.data.message);
    return redirect("../all-jobs");
  }
};

const DeleteJob = () => {
  return <div>DeleteJob</div>;
};
export default DeleteJob;
