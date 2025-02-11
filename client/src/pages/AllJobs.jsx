import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log("params", params);

  try {
    const { data } = await customFetch.get("/jobs", {
      params,
    });
    return { data, params };
  } catch (error) {
    toast.success(error.response.data.message ?? "Error grtting Jobs");
    return error;
  }
};

const AllJobs = () => {
  const {
    data: { data },
    params,
  } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, params }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

const AllJobsContext = createContext();
export const useJobsCotext = () => useContext(AllJobsContext);

export default AllJobs;
