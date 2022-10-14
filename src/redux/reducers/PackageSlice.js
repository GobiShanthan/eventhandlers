import {  createSlice } from "@reduxjs/toolkit";



const initialState = {
    createdPackage : null,
    pkCreateStatus:'',
    error:''
};

export const userSlice = createSlice({
  name: "createPackage",
  initialState,
  reducers: {
    packageCreatePending: (state) => {
      state.pkCreateStatus = "loading";
    },
    packageCreateFulfilled: (state, action) => {
      state.createdPackage = action.payload;
      state.pkCreateStatus = "success";
    },
    packageCreateRejected: (state, action) => {
      state.pkCreateStatus = "failed";
      state.error = action.payload;
    }
  },
});

export const { packageCreatePending, packageCreateFulfilled, packageCreateRejected } =
  userSlice.actions;

export default userSlice.reducer;
