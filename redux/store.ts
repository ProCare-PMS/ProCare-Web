import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import facilityReducer from "./facilitySlice";
import personalInforResponseReducer from "./personalInformationResponse";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pharmacyId: facilityReducer,
    personalInfoResponse: personalInforResponseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
