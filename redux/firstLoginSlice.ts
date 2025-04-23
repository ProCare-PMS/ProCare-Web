import { FirstLoginState } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "zod";

const initialState: FirstLoginState = {
  step: "",
  account: [],
  accountcode: "",
};

const firstLoginSlice = createSlice({
  name: "firstLogin",
  initialState,
  reducers: {
    setfirstLoginSuccess: (state, action: PayloadAction<FirstLoginState>) => {
      state.step = action.payload?.step;
      state.account = action.payload?.account;
      state.accountcode = action.payload?.accountcode;
    },
    firstLoginFailure: (state, action: PayloadAction<FirstLoginState>) => {
      state.step = "Login Failed";
    },
  },
});

export const { setfirstLoginSuccess, firstLoginFailure } =
  firstLoginSlice.actions;
export default firstLoginSlice.reducer;
