// types/auth.ts
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  custom_pharmacy_id: string;
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken?: string | null;
  user: User | null;
  error: string | null;
}

export interface LoginCredentials {
  custom_pharmacy_id: string;
  password: string;
}

export interface DashboardStatsResponse {
  daily_items_sold: number;
  daily_profit: string;
  daily_sales: string;
  expiring_soon_products: number;
  expiry_soon_products_list: [];
  items_in_stock: number;
  low_stock_products: number;
  recent_purchases: [];
  recent_stock_transfers: [];
  top_categories: [];
  total_categories: number;
  total_products: number;
  total_suppliers: number;
}
