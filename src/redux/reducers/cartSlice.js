import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  error: "",
};

export const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //ADD ACTION PAYLOAD VALUE INTO ITEM TO MAKE IT EAISER TO WORK WITH
      const item = action.payload;

      // CHECK IF THE NEW ITEM EXISTS ALREADY IN THE CART (WE DONT WANT REPEAT ITEMS)
      const existItem = state.cart.find((x) => x._id === item._id);

      //IF IT DOES EXIST WE ARE GOING TO CHECK IF THE IDS MATCH , AND IF IT DOES THEN REPLACE WITH NEW VALUE (MIGHT HAVE CUSTOM ADJUSTMENTS! LIKE QTY CHANGE ETC)
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) => (x._id === existItem._id ? item : x)),
        };
      } else {
        //ELSE PUSH(NOT DIRECTLY BECAUSE REACT LOL...) INSIDE THE CART
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },

    deleteFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((x) => x._id !== action.payload),
      };
    },
  },
});

export const { addToCart, deleteFromCart } = userSlice.actions;

export default userSlice.reducer;
