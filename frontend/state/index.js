import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAdmin: null,
  isEditMode: false,
  isFileEdit: false,
  isLightMode: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.user.role === "admin";
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = null;
    },
    setIsLightMode: (state) => {
      state.isLightMode = !state.isLightMode;
    },
    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setIsFileEdit: (state, action) => {
      state.isFileEdit = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setIsLightMode,
  setIsEditMode,
  setIsFileEdit,
} = authSlice.actions;
export default authSlice.reducer;
