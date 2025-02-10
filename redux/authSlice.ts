// redux/authSlice.ts
import { AuthState, User } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  refreshToken: "",
  user: null,
  error: null,
  accountType: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user: User;
        accountType: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.token = action?.payload?.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.accountType = action.payload.accountType;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.accountType = null;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<AuthState["user"]>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  updateUser,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
