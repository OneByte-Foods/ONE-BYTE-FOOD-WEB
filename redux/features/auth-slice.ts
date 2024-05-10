"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.uid = action.payload.uid;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.uid = "";
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
