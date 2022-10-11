import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {
  CartContainer,
  BorderContainer
} from './Cart.styled'



const Cart = () => {

  //REDUX
const dispatch = useDispatch()

const cartData = useSelector((state)=>state.cartData)


  return (
    <CartContainer >
      {cartData && cartData.cart ? cartData.cart.map(c=>(
        <BorderContainer cartFull={true}>
          <h1>{c.title}</h1>
          <h3>{c.description}</h3>
          <h3>CAD ${c.price.toFixed(2)}</h3>


          
        <button>Delete</button>

        </BorderContainer>
      )):<h1>Your cart is empty</h1>}
    </CartContainer>
  )
}

export default Cart
