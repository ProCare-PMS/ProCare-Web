import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FacilityState {
  id: string | null;
}

const initialState: FacilityState = {
  id: null,
};

const facilitySlice = createSlice({
  name: "pharmacyId",
  initialState,
  reducers: {
    setFacilityId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setFacilityId } = facilitySlice.actions;
export default facilitySlice.reducer;
