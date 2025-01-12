import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import facilityReducer from "./facilitySlice";
import personalInforResponseReducer from "./personalInformationResponse";
import firstLoginReducer from "./firstLoginSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pharmacyId: facilityReducer,
    personalInfoResponse: personalInforResponseReducer,
    firstLogin: firstLoginReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
