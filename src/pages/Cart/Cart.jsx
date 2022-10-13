import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import MenuItem from '../../components/MenuItems/MenuItem'
import Checkout from '../Checkout/Checkout'
import {
  CartContainer,
  BorderContainer,
  CartBoxDiv
} from './Cart.styled'
import Cart from "../../components/Cart/Cart"


const CartPage = () => {





  const cartData = useSelector((state)=>state.cartData)





  if(cartData && cartData.cart && cartData.cart.length > 0 ) {


const subTotal = Number(cartData.cart.reduce((acc,item)=>acc+item.price,0)).toFixed(2)
const taxPrice = Number(subTotal*.13).toFixed(2)
const totalPrice =  (subTotal*1.13).toFixed(2)

console.log(subTotal,'this is the')




    return (
      <CartContainer >
        <Cart />
        <CartBoxDiv>
          <h1>SubTotal: $ {subTotal ? subTotal: '0.00'}</h1>
          <hr/>
          <h2>Taxes: $ {taxPrice ? taxPrice: '0.00'}</h2>
          <hr/>
          <h2>Price: $ {totalPrice ? totalPrice: '0.00'}</h2>
          <MenuItem name='checkout' link='/checkout' />
        </CartBoxDiv>
      </CartContainer>
    )
  }else{
    return (
      <CartContainer >
        <Cart />
       
        <CartBoxDiv>
        <h1>SubTotal: $ {'0.00'}</h1>
          <hr/>
          <h2>Taxes: $ {'0.00'}</h2>
          <hr/>
          <h2>Price: $ {'0.00'}</h2>
          <MenuItem name='checkout' link='/checkout' />
        </CartBoxDiv>
      </CartContainer>
    )
  }
  
}

export default CartPage;
