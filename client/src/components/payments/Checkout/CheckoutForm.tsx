import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useNotifyContext } from "../../../context/Notify";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  let notify = useNotifyContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e : React.SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsProcessing(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#/orders`,
      },
      redirect: 'if_required'
    });

    
    notify({ type: 'success', msg: 'Order successfully initiated'});
    setIsProcessing(false);
    navigate('/orders');
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
    </form>
  )
}
