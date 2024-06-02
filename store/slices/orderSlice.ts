// slices/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderState {
  orderList: OrderItem[];
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('orderList');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn('Could not load order list from local storage', e);
    return [];
  }
};

const saveState = (state: WritableDraft<OrderState>) => {
  try {
    const serializedState = JSON.stringify(state.orderList);
    localStorage.setItem('orderList', serializedState);
  } catch (e) {
    console.warn('Could not save order list to local storage', e);
  }
};

const initialState: OrderState = {
  orderList: loadState(),
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<OrderItem>) {
      const existingOrder = state.orderList.find(item => item.id === action.payload.id);
      if (existingOrder) {
        existingOrder.quantity += action.payload.quantity;
      } else {
        state.orderList.push(action.payload);
      }
      saveState(state);
    },
    clearOrders(state) {
      state.orderList = [];
      saveState(state);
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
