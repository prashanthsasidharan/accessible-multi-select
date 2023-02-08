import React from 'react'
import Card from 'react-bootstrap/Card';
import { InputGroup, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { CustomToggle, handleContinue } from './custom';

export default function AddressCollapse({ paymentDetails, updatePaymentDetails }) {
  const [validatedAddress, setValidatedAddress] = useState(false);

  let shippingAddress = paymentDetails?.shipping || {};
  
  function onFormContinue(e) {
    e.preventDefault();
    updatePaymentDetails('shipping', new FormData(e.target));
  }


  return (
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
        <Form noValidate validated={validatedAddress} onSubmit={onFormContinue} className="container mt-3 mb-3">
            <Row className="mb-3">
                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" name="first_name" required defaultValue={shippingAddress.first_name} className="form-control" data-field="first-name" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter First Name or click the filler to prefill data.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" name="last_name" required defaultValue={shippingAddress.last_name} className="form-control" data-field="last-name" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a Last Name or click the filler to prefill data.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                    <Form.Label>Mobile Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                        <Form.Control aria-label="Mobile Number" type="mobile" required aria-describedby="basic-addon1" className="form-control" name="mobile" defaultValue={shippingAddress.mobile} data-field="mobile" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please enter valid mobile number or click the filler to prefill data.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <Form.Control aria-label="Recipient's username" required aria-describedby="basic-addon2" type="email" name="email" defaultValue={shippingAddress.email} data-field="shipping-email"/>
                        <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please enter valid email or click the filler to prefill data.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group className=" col" controlId="formGridAddress1">
                    <Form.Label>Address(Area and Street)</Form.Label>
                    <Form.Control className="form-control" as="textarea" required type="text" name="address" defaultValue={shippingAddress.address} data-field="shipping-address"/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter street or area name or click the filler to prefill data.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group controlId="formGridCity" className="col col-sm-4">
                    <Form.Label>City</Form.Label>
                    <Form.Control className="form-control" type="text" required name="city" defaultValue={shippingAddress.city} data-field="city" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a city or click the filler to prefill data.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGridState" className="col col-sm-4">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue={shippingAddress.state} className="form-control" name="state" required data-field="state">
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="New York">New York</option>
                        <option value="Colorado">Colorado</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formGridpin" className="col col-sm-4">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control className="form-control" type="pin" name="pin" required defaultValue={shippingAddress.pin} data-field="pin-code" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter valid pin-code or click the filler to prefill data.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
                    <CustomToggle eventKey="2" hideToggle={false} canContinue={(e) => handleContinue(e, setValidatedAddress)}>Continue</CustomToggle>
            </Form>

        </Card.Body>
      </>
    </Accordion.Collapse>
  </Card>
  )
}
