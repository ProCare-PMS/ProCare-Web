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

interface accountFirstLogin {
  id: string;
  name: string;
  email: string;
  account_type: string;
  custom_pharmacy_id: string;
}

export interface FirstLoginState {
  step: string;
  account: accountFirstLogin[];
}

export interface SuppliersResponse {
  id: string;
  name: string;
  contact: string;
  email: string;
  slug: string;
  last_purchase_date: Date;
  total_purchase_amount: string;
  total_purchase_quantity: number;
  delivery_frequency: number;
  order_accuracy: number;
  //created_at: "2025-01-04T22:45:32.995463Z";
  //modified_at: "2025-01-04T22:45:32.995488Z";
}


interface ProductsType {
  productName: string;
  unit: string;
  brand_name: string;
  quantity: number;
  expiry_date: string;
  unit_price: string;
  status: string;
  productDetails?: {
    batchNo: string;
    productQuantity: number;
    productExpiry: string;
    productPrice: number;
  };
}