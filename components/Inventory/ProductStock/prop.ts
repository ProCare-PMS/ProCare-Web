export interface ProductStockType {
  stock_number: string;
  product: string;
  quantity: number;
  unit: string;
  counted: number;
  difference: number;
  amount: number;
  brand: string;
  category: string;
  cost_price: string;
  created_at: string;
  expiry_date: string;
  id: string;
  low_stock: boolean;
  manufacture_date: string | null;
  markup_percentage: string;
  modified_at: string;
  name: string;
  pharmacy: string;
  product_status: string;
  reorder_level: number;
  selling_price: string;
  slug: string;
  strength: string;
  supplier: string;
  unit_price: string | null;
}

export interface stockTakingProps {
  title: string;
  setModal: () => void;
}
