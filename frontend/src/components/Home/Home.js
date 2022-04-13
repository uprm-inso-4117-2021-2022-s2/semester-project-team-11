import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button, Carousel } from 'react-bootstrap';
import stocksImage from '../../../src/images/Stocks.jpg';
import educationalResources from '../../../src/images/EducationalResources.jpg';
import economicIndicators from '../../../src/images/EconomicIndicators.jpg';
import news from '../../../src/images/News.jpg';
import NavbarComponent from "../Navbar/Navbar.js";
import './Home.css';

function Home() {
        const NavComponent = <Nav className="ml-auto button-link">
                                <Button variant="dark" className='nav-buttons' href='/register'> Register </Button>
                                <Button variant="dark" className='nav-buttons' href='/login'> Login </Button>
                            </Nav>

        return (
            <>
            <NavbarComponent NavComponent={ NavComponent }/>
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
