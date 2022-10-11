import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import MenuItem from '../../components/MenuItems/MenuItem'
import Checkout from '../Checkout/Checkout'
import {
  CartContainer,
  BorderContainer
} from './Cart.styled'
import Cart from "../../components/Cart/Cart"


const CartPage = () => {

  return (
    <CartContainer >
      <Cart />
      <MenuItem name='checkout' link='/checkout' />
    </CartContainer>
  )
}

export default CartPage
