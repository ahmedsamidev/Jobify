import customFetch from "../utils/customFetch";
import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data } = await customFetch("/jobs/stats");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);

  return data;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);

  const {
    data: { stats, monthlyApplications },
  } = data;

  console.log(stats, monthlyApplications);

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
