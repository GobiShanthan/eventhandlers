import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  lightGold,
  lightblack,
  darkGold,
  grey
} from '../Colors/colors'
import CheckoutForm from "../CheckoutForms/CheckOutForm";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51Ls9WNLg4Ot6e5annE228kFkZ5p0MvGbsNi274rdvsdwjE5NyyMfRL6CAo0d6ykB4mWuMCcddqgXeyQzXzEXOrjW00gGfgZfRh");

export default function App() {


  const cartData = useSelector((state)=>state.cartData)

  
const subTotal = Number(cartData.cart.reduce((acc,item)=>acc+item.price,0)).toFixed(2)
const taxPrice = Number(subTotal*.13).toFixed(2)
const totalPrice =  (subTotal*1.13).toFixed(2)



  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ total: totalPrice }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const appearance = {
    theme: 'night',
    variables: {
      fontFamily: 'Sohne, system-ui, sans-serif',
      fontWeightNormal: '500',
      borderRadius: '8px',
      colorBackground: 'black',
      colorPrimary: 'grey',
      colorPrimaryText: '#D4AF37',
      colorText: '#D4AF37',
      colorTextSecondary: '#D4AF37',
      colorTextPlaceholder: '#D4AF37',
      colorIconTab: '#D4AF37',
      colorLogo: 'dark'
    },
    rules: {
      '.Input, .Block': {
        border: '1.5px solid var(--colorPrimary)'
      }
    }
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div  style={{display: 'flex',justifyContent: 'center', flexDirection:'row'}}>
      <div style={{maxWidth:'500px'}}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>

    </div>
  );
}
