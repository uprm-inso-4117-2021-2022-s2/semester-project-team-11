import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import stocksImage from '../../../src/images/Stocks.jpg';
import educationalResources from '../../../src/images/EducationalResources.jpg';
import economicIndicators from '../../../src/images/EconomicIndicators.jpg';
import news from '../../../src/images/News.jpg';
import NavbarComponent from "../Navbar/Navbar.js";
import './Home.css';

function Home() {

    return (
        <>
            <NavbarComponent nav={localStorage.getItem('userid') ? false : true} />
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
                                    <a href="/resources">
                                        <img
                                            className="d-block w-100"
                                            src={educationalResources}
                                            alt="First slide"
                                        />
                                    </a>

                                    <Carousel.Caption>
                                        <h3>Educational Resources</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <a href='/stocks'>
                                        <img
                                            className="d-block w-100"
                                            src={stocksImage}
                                            alt="Second slide"
                                        />
                                    </a>

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
