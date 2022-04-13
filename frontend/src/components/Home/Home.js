import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Card, Button, Carousel } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Container, Col, Row, Form } from "react-bootstrap";
import './Home.css';
import logo from '../../../src/images/StockLogo.svg';
import stocksImage from '../../../src/images/Stocks.jpg';
import educationalResources from '../../../src/images/EducationalResources.jpg';
import economicIndicators from '../../../src/images/EconomicIndicators.jpg';
import news from '../../../src/images/News.jpg';
// import NavBar from "frontend/src/components/Navbar/Navbar.js";

function Home() {

        return (
            <>
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
              <Nav className="ml-auto">
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
              </Container>
            </Navbar>


            <div>
                <div className='container-fluid' >
                    <div className="row">
                        <div className="col-sm-12">
                          <h2>   

                          </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Carousel className='w-50 p-3' >

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={educationalResources}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Educational Resources</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={stocksImage}
                                        alt="Second slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Stocks</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={news}
                                        alt="Third slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>News</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={economicIndicators}
                                        alt="Fourth slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Economic Indicators</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>

                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>





          </>
        );
    }

export default Home;
