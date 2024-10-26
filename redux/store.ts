// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loginSuccess } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Check if token exists in local storage on app load
const token = localStorage.getItem("authToken");
if (token) {
  const user = null;
  if (user) {
    store.dispatch(loginSuccess({ token, user }));
  }
}

export default store;
