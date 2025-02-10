import { AccountTypes } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountTypes = {
  accountType: "",
};

const accountTypeSlice = createSlice({
  name: "accountType",
  initialState,
  reducers: {
    setAccountType: (state, action: PayloadAction<AccountTypes>) => {
      state.accountType = action.payload?.accountType;
    },
  },
});

export const { setAccountType } = accountTypeSlice.actions;

export default accountTypeSlice.reducer;
