export type Products = {
  _id: number;
  productTitle: string;
  products: { id: number; name: string; quantity: number; price: number }[];
};
