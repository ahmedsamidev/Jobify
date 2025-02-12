import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: ["jobs", search, jobStatus, jobType, sort, page],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      await queryClient.ensureQueryData(allJobsQuery(params));
      return { params };
    } catch (error) {
      toast.success(error.response.data.message ?? "Error getting Jobs");
      return error;
    }
  };

const AllJobs = () => {
  const { params } = useLoaderData();
  const { data: data } = useQuery(allJobsQuery(params));

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
