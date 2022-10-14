import {  createSlice } from "@reduxjs/toolkit";


const initialState = {
  updatedUser:null,
  error: "",
  status: "",
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUserPending: (state) => {
      state.status = "loading";
    },
    updateUserFulfilled: (state, action) => {
      state.userInfo = action.payload;
      state.status = "success";
    },
    updateUserRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }
  },
});

export const { updateUserPending, updateUserFulfilled, updateUserRejected, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
