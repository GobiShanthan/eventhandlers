const express = require('express')
const router = express.Router()





// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_51Ls9WNLg4Ot6e5anY7PlWYVWCFcg9qZM8yjZTnx9DcxyRC8RCSrr1LMYuccwTMZQqH5SceQGZFuPSmlYl1eWVNQk00x487WBAs');

const calculateOrderAmount = (items) => {
let totalPrice = items && items[0].total
console.log(typeof totalPrice)
  return Number(totalPrice);
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router


   