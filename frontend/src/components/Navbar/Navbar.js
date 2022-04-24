import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from '../../images/StockLogo.svg';

export default function NavbarComponent({ nav }) {
  const defaultNav = <Nav className="ml-auto button-link">
                            <Button variant='dark' href='/register'> Register </Button>
                            <Button variant='dark' href='/login'> Login </Button>
                        </Nav>

  return (
    <Navbar className="color-nav" >
        <Container>
            <Navbar.Brand href="/">
            <img alt="" src={logo} width="120" height="50" className="d-inline-block align-top" />
            {' '}
            </Navbar.Brand>
            { nav ? nav === true ? defaultNav : nav : null }
        </Container>
    </Navbar>
  )
}
