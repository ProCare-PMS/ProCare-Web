import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";

export async function fetchDashboardData() {
  const response = await customAxios.get(endpoints.dashboard);
  return response.data;
}

export async function fetchRecentTransactions(page = 1) {
  const response = await customAxios.get(`${endpoints.sales}?page=${page}`);
  return response.data;
}