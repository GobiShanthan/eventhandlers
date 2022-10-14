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
  error: "",
  status: "",
};

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.status = "loading";
      state.error='';
      state.status=''
    },
    loginFulfilled: (state, action) => {
      state.userInfo = action.payload;
      state.status = "success";
      state.error='';

    },
    loginRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("token");
      state.userInfo = null;
      state.error='';
      state.status=''
    },
  },
});

export const { loginPending, loginFulfilled, loginRejected, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
