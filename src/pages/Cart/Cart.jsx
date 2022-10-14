import { Link,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector} from "react-redux";

import { Button } from "@mui/material";
import {
  CartContainer,
  CartBoxDiv,
  CartBoxItemDiv,
  CartBoxItemTitle,
  TextSize,
} from "./Cart.styled";
import Cart from "../../components/Cart/Cart";
import { lightGold, grey } from "../../components/Colors/colors";

const CartPage = () => {
  const cartData = useSelector((state) => state.cartData);

  const { userInfo } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo ) {
      navigate("/");
    }
  }, [userInfo]);

  if (cartData && cartData.cart && cartData.cart.length > 0) {
    const subTotal = Number(
      cartData.cart.reduce((acc, item) => acc + item.price, 0)
    ).toFixed(2);
    const taxPrice = Number(subTotal * 0.13).toFixed(2);
    const totalPrice = (subTotal * 1.13).toFixed(2);

    return (
      <CartContainer>
        <Cart />

        <CartBoxDiv>
          <CartBoxItemDiv>
            <TextSize>SUBTOTAL: $</TextSize> {subTotal ? subTotal : "0.00"}
          </CartBoxItemDiv>

          <CartBoxItemDiv>
            <TextSize>TAXES: $</TextSize> {taxPrice ? taxPrice : "0.00"}
          </CartBoxItemDiv>

          <CartBoxItemDiv>
            <TextSize>PRICE: $</TextSize> {totalPrice ? totalPrice : "0.00"}
          </CartBoxItemDiv>
        </CartBoxDiv>

        <Button
          style={{
            justifySelf: "center",
            margin: "20px",
            backgroundColor: `${lightGold}`,
            alignItems: "center",
          }}
          name="checkout"
        >
          <Link
            style={{ color: `${grey}`, textDecoration: "none" }}
            to="/checkout"
          >
            CHECKOUT
          </Link>
        </Button>
      </CartContainer>
    );
  } else {
    return (
      <CartContainer>
        <h1 style={{ color: "white" }}>Your Cart is Empty</h1>

        <CartBoxDiv>
          <CartBoxItemTitle>
            <h1>CART</h1>
          </CartBoxItemTitle>

          <CartBoxItemDiv>
            <h1>SubTotal: $</h1> {"0.00"}
          </CartBoxItemDiv>

          <CartBoxItemDiv>
            <h1>Taxes: $</h1> {"0.00"}
          </CartBoxItemDiv>

          <CartBoxItemDiv>
            <h1>Price: $</h1> {"0.00"}
          </CartBoxItemDiv>
        </CartBoxDiv>
      </CartContainer>
    );
  }
};

export default CartPage;
