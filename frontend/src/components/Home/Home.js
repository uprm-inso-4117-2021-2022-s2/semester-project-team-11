import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Card, Button, Carousel } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Container, Col, Row, Form } from "react-bootstrap";
import './Home.css';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from "mdbreact";
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
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/register">Login</Nav.Link>
              </Nav>
              </Container>
            </Navbar>


            <Carousel variant="dark">
  <Carousel.Item interval={1000}>
    
    <Carousel.Caption>
      <h3>News</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <Carousel.Caption>
      <h3>Educational Resources</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <Carousel.Caption>
      <h3>Dashboard</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

{/* <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        className="z-depth-1"
        slide
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(45).webp"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(46).webp"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(47).webp"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer> */}



          </>
        );
    }
}

export default Home;
