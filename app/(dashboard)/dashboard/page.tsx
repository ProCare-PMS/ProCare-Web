import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import DashboardHomePage from "@/components/Dashboard/DashboardPage";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

export const revalidate = 60; // ISR: Regenerate page every 60 seconds

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.dashboard).then((res) => res.data),
  });

  await queryClient.prefetchQuery({
    queryKey: ["recentTransactionsData", 1],
    queryFn: async () =>
      await customAxios.get(`${endpoints.sales}?page=1`).then((res) => res.data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardHomePage />
    </HydrationBoundary>
  );
}
