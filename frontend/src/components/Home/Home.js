import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Container, Col, Row, Form } from "react-bootstrap";
import './Home.css';
import logo from '../../../src/images/Stocks_GrowthCombined.png';
// import NavBar from "frontend/src/components/Navbar/Navbar.js";

class Home extends Component {
    render(){
        return (
            <>
            <Navbar className="color-nav" >
                
              <Container>
              <Navbar.Brand href="#home">
                <img
                alt=""
                src={logo}
                width="120"
                height="50"
                className="d-inline-block align-top"
                    />{' '}
              </Navbar.Brand>
              <Nav className="ml-auto">
                <Nav.Link href="#Register">Register</Nav.Link>
                <Nav.Link href="#Login">Login</Nav.Link>
              </Nav>
              </Container>
            </Navbar>
          </>
        );
    }
}

export default Home;
