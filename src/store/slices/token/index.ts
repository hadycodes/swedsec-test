import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AUTH_KEY } from "../../../const";

interface TokenState {
  isAuthenticated: boolean;
  token: string | null;
  error: Error | null;
}

const initialState: TokenState = {
  isAuthenticated: localStorage.getItem(AUTH_KEY) !== null,
  token: localStorage.getItem(AUTH_KEY),
  error: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ code: string }>) => {
      const { code } = action.payload;
      if (code) {
        localStorage.setItem(AUTH_KEY, code);
        state.isAuthenticated = true;
        state.token = code;
      } else {
        state.isAuthenticated = false;
        state.token = null;
      }
    },
    logout: (state, action: PayloadAction<{ isLogout: Boolean }>) => {
      const { isLogout } = action.payload;
      if (isLogout === true) {
        localStorage.removeItem(AUTH_KEY);
        state.isAuthenticated = false;
        state.token = null;
      } else {
        state.error = Error("Failed to login");
      }
    },
  },
});

export const { setToken, logout } = tokenSlice.actions;
