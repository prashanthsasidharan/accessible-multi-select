import React from 'react'
import { Container, Navbar as NavbarBs, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export function Navbar() {
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button style={{width: "3rem", height: '3rem'}}  variant="outline-primary" className='rounded-circle position-relative'>
          svg
          <div 
            className='position-absolute bg-danger rounded-circle d-flex justify-content-center align-items-center text-white'
            style={{width: "1.5rem", height: "1.5rem", right: 0, bottom: 0, transform:"translate(25%, 25%)"}}
          >
            3
          </div>
        </Button>
      </Container>
    </NavbarBs>
  )
}
