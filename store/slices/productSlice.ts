import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [
    { id: 1, name: 'Paracetamol - 500g', quantity: 0, price: 34295 },
    { id: 2, name: 'Citrus C - 100g', quantity: 0, price: 34295 },
    { id: 3, name: 'Aspirin', quantity: 0, price: 34295 },
    { id: 4, name: 'Penicillin', quantity: 0, price: 34295 },
    { id: 5, name: 'Insulin', quantity: 0, price: 34295 },
    { id: 6, name: 'Ibuprofen', quantity: 0, price: 34295 },
    //{ id: 7, name: 'Turmeric', quantity: 0, price: 34295 },
    //{ id: 8, name: 'Ginseng', quantity: 0, price: 34295 },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increaseQuantity(state, action: PayloadAction<number>) {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const product = state.products.find(p => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { increaseQuantity, decreaseQuantity } = productSlice.actions;
export default productSlice.reducer;
