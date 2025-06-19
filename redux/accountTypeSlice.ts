import { AccountTypes } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountTypes = {
  accountType: "",
  passcode: "",
};

const accountTypeSlice = createSlice({
  name: "accountType",
  initialState,
  reducers: {
    setAccountType: (state, action: PayloadAction<AccountTypes>) => {
      state.accountType = action.payload?.accountType;
      state.passcode = action.payload?.passcode;
    },
    setPasscode: (state, action: PayloadAction<string>) => {
      state.passcode = action.payload;
    },
  },
});

export const { setAccountType, setPasscode } = accountTypeSlice.actions;

export default accountTypeSlice.reducer;
