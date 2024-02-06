import { createSlice } from "@reduxjs/toolkit";

const storedAuthState = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
};

const initialState = {
  isLoggedIn: storedAuthState.isLoggedIn,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: false }));
    },
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true }));
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
