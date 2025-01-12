import { FirstLoginState } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FirstLoginState = {
  step: "",
  account: [],
};

const firstLoginSlice = createSlice({
  name: "firstLogin",
  initialState,
  reducers: {
    setfirstLoginSuccess: (state, action: PayloadAction<FirstLoginState>) => {
      state.step = action.payload?.step;
      state.account = action.payload?.account;
    },
    firstLoginFailure: (state, action: PayloadAction<FirstLoginState>) => {
      state.step = "Login Failed";
    },
  },
});

export const { setfirstLoginSuccess, firstLoginFailure } =
  firstLoginSlice.actions;
export default firstLoginSlice.reducer;
