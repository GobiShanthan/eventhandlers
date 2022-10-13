import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  shippingAddress:null,
  packageItems:[],
  paymentMethod:'stripe',
  error: "",
  status: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addAddress: (state,action) => {
      state.status = "success";
      state.shippingAddress = action.payload
    }
  },
});

export const { addAddress } =
  orderSlice.actions;

export default orderSlice.reducer;
