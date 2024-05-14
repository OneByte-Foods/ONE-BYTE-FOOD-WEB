"use client";

import { createSlice } from "@reduxjs/toolkit";

interface User {
  imageUrl: string;
  username: string;
  email: string;
  roles: string[];
  restaurantId: string;
}
const initialState: User = {
  
  imageUrl: "",
  email: "",
  username: "",
  roles: [],
  restaurantId: "",
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
      state.restaurantId = action.payload.restaurantId;
    },
    removeUser: (state) => {
      state.email = "";
      state.imageUrl = "";
      state.username = "";
      state.roles = [];
      restaurantId: "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
