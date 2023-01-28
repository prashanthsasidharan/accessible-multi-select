import Accordion from 'react-bootstrap/Accordion';
import LoginCollapse from '../components/payments/Login';
import AddressCollapse from '../components/payments/Address';
import OrderCollapse from '../components/payments/Order';
import CheckoutCollapse from '../components/payments/Checkout/CheckoutCollapse';
import { useRef } from 'react';
export default function Payment() {

  let paymentDetails = useRef({});
  function updatePaymentDetails(prop, value) {
    paymentDetails.current[prop] = value;
  }

  return (
    <Accordion defaultActiveKey="0">
      <LoginCollapse paymentDetails={paymentDetails} updatePaymentDetails={updatePaymentDetails} />
      <AddressCollapse paymentDetails={paymentDetails} updatePaymentDetails={updatePaymentDetails} />
      <OrderCollapse paymentDetails={paymentDetails} updatePaymentDetails={updatePaymentDetails} />
      <CheckoutCollapse paymentDetails={paymentDetails.current} />
    </Accordion>
  );
}