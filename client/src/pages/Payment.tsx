import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { AccordionContext, Button, InputGroup, Row } from 'react-bootstrap';
import { ReactNode, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Checkout from '../components/Checkout';

type CustomToggleType = {
  children: ReactNode,
  eventKey: string,
  hideToggle?: Boolean
}

function CustomToggle({ children, eventKey, hideToggle=true } : CustomToggleType) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log()
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'pink',  }}
      className={`${(hideToggle && eventKey >= activeEventKey) && 'd-none' }`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function handleChange() {

}

export default function Payment() {
  return (
    <Accordion defaultActiveKey="3">
      <Card>
        <Card.Header className='d-flex justify-content-between'>
          <div>
            Login
          </div>
          <CustomToggle eventKey="0">Change</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else 😉
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
            <CustomToggle eventKey="1" hideToggle={false}>Continue</CustomToggle>
          </>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className='d-flex justify-content-between'>
          <div>
            Address
          </div>
          <CustomToggle eventKey="1">Change</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <>
            <Card.Body>




  <form className="container mt-3 mb-3">
    <Row className="mb-3">
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="name" name="first_name" value="{form.first_name}" onChange="{handleChange}" className="form-control" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="name" name="last_name" value="{form.last_name}" onChange="{handleChange}" className="form-control" />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label>Mobile Number</Form.Label>
            <InputGroup>
                <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value="{form.mobile}" onChange="{handleChange}" />
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Email</Form.Label>
            <InputGroup>
                <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" type="email" name="email" value="{form.email}" onChange="{handleChange}" />
                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
            </InputGroup>
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group className=" col" controlId="formGridAddress1">
            <Form.Label>Address(Area and Street)</Form.Label>
            <Form.Control className="form-control" as="textarea" type="text" name="address1" value="{form.address1}" onChange="{handleChange}" />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group controlId="formGridCity" className="col col-sm-4">
            <Form.Label>City</Form.Label>
            <Form.Control className="form-control" type="text" name="city" value="{form.city}" onChange="{handleChange}" />
        </Form.Group>
        <Form.Group controlId="formGridState" className="col col-sm-4">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose..." className="form-control" name="a_state" value="{form.a_state}" onChange="{handleChange}">
                <option value="Choose...">Choose...</option>
                <option value="Delhi">Alabama</option>
                <option value="Bombay">Alaska</option>
                <option value="New York">New York</option>
                <option value="Kashmir">Colorado</option>
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formGridpin" className="col col-sm-4">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control className="form-control" type="pin" name="pin" value="{form.pin}" onChange="{handleChange}" />
        </Form.Group>
    </Row>
</form>



            </Card.Body>
            <CustomToggle eventKey="2" hideToggle={false}>Continue</CustomToggle>
          </>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className='d-flex justify-content-between'>
          <div>
            Details
          </div>
          <CustomToggle eventKey="2">Change</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <>
            <Card.Body>Hello! I'm another body2</Card.Body>
            <CustomToggle eventKey="3" hideToggle={false}>Continue</CustomToggle>
          </>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header className='d-flex justify-content-between'>
          <div>
            Payment
          </div>
          <CustomToggle eventKey="3">Change</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <>
            <Card.Body>
              <Checkout />
            </Card.Body>
            <Button>Pay</Button>
          </>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}