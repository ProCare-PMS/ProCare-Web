import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface personalInfoResponseType {
  id: string;
  first_name: string;
  last_name: string;
  access: string;
  refresh: string;
  custom_pharmacy_id: string;
}

const initialState: personalInfoResponseType = {
  id: "",
  first_name: "",
  last_name: "",
  access: "",
  refresh: "",
  custom_pharmacy_id: "",
};

const personalInfoResponseSlice = createSlice({
  name: "personalInfoResponse",
  initialState,
  reducers: {
    setPersonalInfoResponse: (
      state,
      action: PayloadAction<personalInfoResponseType>
    ) => {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.custom_pharmacy_id = action.payload.custom_pharmacy_id;
    },
  },
});

export const { setPersonalInfoResponse } = personalInfoResponseSlice.actions;
export default personalInfoResponseSlice.reducer;
