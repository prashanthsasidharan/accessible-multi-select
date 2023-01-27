import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "../constants";

function Checkout() {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(BASE_URL + "/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(BASE_URL + "/order", {
      method: "POST",
      body: JSON.stringify({
        "email": "prash@gmail.com",
        "name": "prash",
        "shipping": "address",
        "orders": [{
          "_id": "63d0a3b5eab84083acec2c8e",
          "quantity": 2,
          "amount": 100
        },
        {
          "_id": "63d0a3b5eab84083acec2c91",
          "quantity": 2,
          "amount": 200
        }]
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Checkout;
