import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "../Stripe.css";
import StripeComplete from "../components/StripeComplete";
import { clearCart } from "../redux/Cart/action";
import { clearCurrentOrder } from "../redux/Order/action";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51PyaLGLvPq3tYtyv6cymBL5y6NhMfiTF5HFRyahgiaZaJl5ciCKCn7VHIP7qFUwbJfvz4Y8Bm56O7Wtr7emkDh6S005B8x89Lt"
);

export const StripePaymentComplete = () => {
  const [clientSecret, setClientSecret] = useState("");
  // const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  const dispatch = useDispatch();

  const currentOrder = useSelector((store) => store.orderData.currentOrder);
  console.log(currentOrder);
  const user = useSelector((store) => store.auth.userInfo);
  console.log(user);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder?.totalAmount }),
      meta: {
        order_id: currentOrder?.id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        // setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearCurrentOrder());
  }, [dispatch, user]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    // <Router>
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeComplete />
          {/* <Routes>
              <Route
                path="/stripe-checkout"
                element={<CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
              />
              <Route path="/complete" element={<CompletePage />} />
            </Routes> */}
        </Elements>
      )}
    </div>
    // </Router>
  );
};
