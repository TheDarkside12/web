import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AppBar = () => {

  return (
    <Navbar expand="xl" >
      <Container>
        <Navbar.Brand as={Link} to="/"><h2 className='my-gradient-text'>FusionHub</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
          <Nav variant="underline" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className={ 'text-light fw-bold'}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/store" className={ 'text-light fw-bold'}>Store</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/foodcourt" className={ 'text-light fw-bold'}>Food Court</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/saloon" className={ 'text-light fw-bold'}>Saloon</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/cart" className={ 'text-light fw-bold'}>Cart</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
