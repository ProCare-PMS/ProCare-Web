// app/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import store from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
