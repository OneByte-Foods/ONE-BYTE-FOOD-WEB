"use client";

import { createSlice } from "@reduxjs/toolkit";

interface User {
  imageUrl: string;
  username: string;
  email: string;
  roles: string[];
}
const initialState: User = {
  
  imageUrl: "",
  email: "",
  username: "",
  roles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.imageUrl = action.payload.imageUrl;
      state.username = action.payload.username;
      state.roles = action.payload.roles;
    },
    removeUser: (state) => {
      state.email = "";
      state.imageUrl = "";
      state.username = "";
      state.roles = [];
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
