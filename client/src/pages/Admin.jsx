import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const res = await customFetch.get("/users/admin/app-stats");

    return res.data;
  } catch (error) {
    console.log(error);

    toast.error(error?.response?.data?.message);
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const {
    data: { users, jobs },
  } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="Current Users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="Total Jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
