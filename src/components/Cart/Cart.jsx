import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BorderContainer, CartWrapper, TextDiv } from "./Cart.styled";
import { deleteFromCart } from "../../redux/reducers/cartSlice";
import {
  lightGold,
  darkGold,
  lightBlack,
  grey,
} from "../../components/Colors/colors";

import {Button } from '@mui/material'


const Cart = () => {
  //REDUX
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cartData);

  return (
    <BorderContainer>
      {cartData && cartData.cart ? (
        cartData.cart.map((c, i) => (
          <CartWrapper cartFull={true} key={i}>
            <TextDiv>
              <h1 style={{ textAlign: "left" }}>{c.title}</h1>
            </TextDiv>
            <TextDiv>
              {" "}
              <h3 style={{ textAlign: "left" }}>{c.description}</h3>
            </TextDiv>
            <TextDiv>
              {" "}
              <h3 style={{ textAlign: "left" }}>CAD ${c.price.toFixed(2)}</h3>
            </TextDiv>
            <TextDiv>
              <Button
                style={{
                  justifySelf: "center",
                  margin: "20px",
                  backgroundColor: `${lightGold}`,
                  alignItems: "center",
                }}
                variant="contained"
                onClick={() => dispatch(deleteFromCart(c._id))}
              >
                DELETE
              </Button>
            </TextDiv>
          </CartWrapper>
        ))
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </BorderContainer>
  );
};

export default Cart;
