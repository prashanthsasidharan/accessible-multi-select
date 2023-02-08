// This component loads stripe script and then invokes the checkoutForm component as 
// useStripe cannot be called before loading its script
// ref - https://stackoverflow.com/questions/64109065/stripe-reactjs-could-not-find-elements-context


import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_URL } from "../../../constants";
import { useEffect, useState } from "react";
import CheckoutForm from './CheckoutForm';
import { useSearchParams } from 'react-router-dom';
import { useShoppingCart } from '../../../context/ShoppingCartContext';

export default function CheckoutWrapper({ paymentDetails }) {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [searchParams] = useSearchParams();
  let { cartItems, clearItemsFromCart } = useShoppingCart();

  useEffect(() => {
    fetch(BASE_URL + "config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    let data = Object.assign(paymentDetails);
    let address = ''; 
    let orders = []
    data.shipping.forEach((value) => {
      address = address + `${value} `;
    })

    let paymentId = searchParams.get('paymentId');
    let isFromCart = searchParams.get('isFromCart');

    if (isFromCart) {
      orders = cartItems;
      clearItemsFromCart();
    } else {
      orders.push({_id: paymentId, quantity: 1});
    }

    
    data.shipping = address.trim();
    data.orders = orders

    console.log(data);
    

    fetch(BASE_URL + "order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    clientSecret && stripePromise && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
  ))
}
