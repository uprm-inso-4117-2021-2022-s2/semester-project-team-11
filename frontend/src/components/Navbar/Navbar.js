import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
import logo from '../../images/StockLogo.svg';

export default function NavbarComponent({ NavComponent }) {
  return (
    <Navbar className="color-nav" >
        <Container>
            <Navbar.Brand href="/">
            <img
            alt=""
            src={logo}
            width="120"
            height="50"
            className="d-inline-block align-top"
                />{' '}
            </Navbar.Brand>
            {NavComponent}
        </Container>
    </Navbar>
  )
}
