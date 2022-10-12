import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  cart: [],
  error: "",
  status: "",
};

export const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state,action) => {
      state.status = "loading";
      state.cart.push(action.payload)
    }
  },
});

export const { addToCart } =
  userSlice.actions;

export default userSlice.reducer;
