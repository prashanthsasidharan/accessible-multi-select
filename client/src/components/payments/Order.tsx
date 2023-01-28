import React from 'react'
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { CustomToggle } from './custom';

export default function OrderCollapse() {
  return (
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
  )
}
