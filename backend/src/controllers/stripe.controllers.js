const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (totalAmount) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  //   let total = 0;
  //   items.forEach((item) => {
  //     total += item.amount;
  //   });
  //   return total;
  return 10 * 100;
};

router.post("", async (req, res) => {
  const { totalAmount } = req.body;
  console.log("total amount", totalAmount);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalAmount),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});

module.exports = router;
