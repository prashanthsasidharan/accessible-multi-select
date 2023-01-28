import React from 'react'
import { CustomToggle, handleContinue } from './custom';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function LoginCollapse({ paymentDetails, updatePaymentDetails }) {
  const [validatedLogin, setValidatedLogin] = useState(false);

  function onFormContinue(e) {
    e.preventDefault();
    let { name, email } = e.target;
    updatePaymentDetails('name', name.value);
    updatePaymentDetails('email', email.value);
  }

  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        <div>
          Login
        </div>
        <CustomToggle eventKey="0">Change</CustomToggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <Form noValidate validated={validatedLogin} onSubmit={onFormContinue}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required placeholder="Enter name" name="name"  defaultValue={paymentDetails.name} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" required placeholder="Enter email" name="email" defaultValue={paymentDetails.email} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else 😉
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <CustomToggle eventKey="1" hideToggle={false} canContinue={(e) => handleContinue(e, setValidatedLogin)}>Continue</CustomToggle>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}
