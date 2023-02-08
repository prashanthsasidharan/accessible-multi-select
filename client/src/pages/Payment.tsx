import Accordion from 'react-bootstrap/Accordion';
import LoginCollapse from '../components/payments/Login';
import AddressCollapse from '../components/payments/Address';
import OrderCollapse from '../components/payments/Order';
import CheckoutCollapse from '../components/payments/Checkout/CheckoutCollapse';
import { useEffect, useRef } from 'react';
export default function Payment() {

  let paymentDetails = useRef({});
  function updatePaymentDetails(prop, value) {
    paymentDetails.current[prop] = value;
  }

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://embeddable-form-filler.netlify.app/bundle.min.js";
    script.id = 'form-filler';

    document.body.appendChild(script);

    return () => {
      let script = document.querySelector('#form-filler');
      script?.remove();
    }
  }, [])

  return (
    <Accordion defaultActiveKey="0" data-form="payment">
      <LoginCollapse paymentDetails={paymentDetails} updatePaymentDetails={updatePaymentDetails} />
      <AddressCollapse paymentDetails={paymentDetails} updatePaymentDetails={updatePaymentDetails} />
      <OrderCollapse paymentDetails={paymentDetails} updatePaymentDetails={updatePaymentDetails} />
      <CheckoutCollapse paymentDetails={paymentDetails.current} />
    </Accordion>
  );
}