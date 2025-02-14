import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import facilityReducer from "./facilitySlice";
import personalInforResponseReducer from "./personalInformationResponse";
import firstLoginReducer from "./firstLoginSlice";
import accountTypeReducer from "./accountTypeSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "auth",
    "pharmacyId",
    "personalInfoResponse",
    "firstLogin",
    "accountType",
  ],
};

const reducer = combineReducers({
  auth: authReducer,
  pharmacyId: facilityReducer,
  personalInfoResponse: personalInforResponseReducer,
  firstLogin: firstLoginReducer,
  accountType: accountTypeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
