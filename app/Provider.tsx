// app/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import store from "@/redux/store";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
