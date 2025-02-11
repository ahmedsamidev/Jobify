import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";

export const loader = async () => {
  try {
    const response = await customFetch("/jobs/stats ");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const {
    data: { stats, monthlyApplications },
  } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={stats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
