export type Products = {
  id: number,
  productTitle: string,
  products?: { id: number; name: string; quantity: number; price: number }[]
};
