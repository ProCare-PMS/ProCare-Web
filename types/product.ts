export interface ProductsType {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  unit: string;
  category: string;
  reorder_level: number;
  expiry_date: string;
  product_status: string;
  created_at: string;
}