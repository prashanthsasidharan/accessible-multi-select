
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { CustomBody } from '../custom';
import Checkout from './Checkout';

function CheckoutCollapse({ paymentDetails }) {

  return (
     <Card>
        <Card.Header className='d-flex justify-content-between'>
          <div>
            Payment
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            <CustomBody eventKey="3">
                <Checkout paymentDetails={paymentDetails} />
            </CustomBody>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  );
}

export default CheckoutCollapse;
