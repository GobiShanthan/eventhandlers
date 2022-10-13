import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "../../components/MenuItems/MenuItem";
import Checkout from "../Checkout/Checkout";
import { CartContainer, BorderContainer } from "./Cart.styled";
import Cart from "../../components/Cart/Cart";

const CartPage = () => {
  return (
    <div style={{ backgroundColor: '#231F20', height: '100vh' }}>
    <CartContainer>
      <Cart />
      <MenuItem name="Checkout" link="/checkout" />
    </CartContainer>
    </div>
  );
};

export default CartPage;
