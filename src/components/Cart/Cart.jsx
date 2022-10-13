import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {
  BorderContainer
} from './Cart.styled'



const Cart = () => {

  //REDUX
const dispatch = useDispatch()

const cartData = useSelector((state)=>state.cartData)


  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent: 'center'}}>
      {cartData && cartData.cart ? cartData.cart.map(c=>(
        <div style={{maxWidth:'500px',border:'solid 3px gold',margin:"5px",display:'flex', justifyContent: 'space-around'}} cartFull={true}>
          <h1>{c.title}</h1>
          <h3>{c.description}</h3>
          <h3>CAD ${c.price.toFixed(2)}</h3>
        <button>Delete</button>
        </div>
      )):<h1>Your cart is empty</h1>}
    </div>
  )
}

export default Cart
