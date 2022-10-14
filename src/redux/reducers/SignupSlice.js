import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("token");
let userData = null;
if (token) {
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    token = null;
  } else {
    userData = payload.user;
  }
}

const initialState = {
  userInfo: userData,
  name: "",
  username: "",
  email: "",
  error: "",
  status: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupPending: (state) => {
      state.status = 'loading';
      state.error='';

    },
    signupFulfilled: (state, action) => {
      state.userInfo = action.payload;
      state.status = 'success';
      state.error='';

    },
    signupRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;

    },
  },
});

export const {signupPending, signupFulfilled, signupRejected} = signupSlice.actions;

export default signupSlice.reducer;