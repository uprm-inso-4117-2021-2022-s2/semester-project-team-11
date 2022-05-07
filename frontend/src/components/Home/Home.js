import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import stocksImage from '../../../src/images/HomePage/Stocks.svg';
import educationalResources from '../../../src/images/HomePage/Educational_Resources.svg';
import news from '../../../src/images/HomePage/News.svg';
import NavbarComponent from "../Navbar/Navbar.js";
import './Home.css';

function Home() {

    const nav1 = {login: true, register: true}
    const nav2 = {dashboardRight: true}

    return (
        <>
            <NavbarComponent nav={localStorage.getItem('userid') ? nav2 : nav1} />
            <div>
                <div className='container-fluid' >
                    <div className="row">
                        <div className="col-sm-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='home-intro'>
                                Welcome to Stocker, all you need for market education!
                            </div>
                            <Carousel className='w-75 p-3' >
                                <Carousel.Item>
                                    <a href="/resources">
                                        <img
                                            className="d-block w-100"
                                            src={educationalResources}
                                            alt="First slide"
                                        />
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a href='/stocks'>
                                        <img
                                            className="d-block w-100"
                                            src={stocksImage}
                                            alt="Second slide"
                                        />
                                    </a>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <a href='/news'>
                                        <img
                                            className="d-block w-100"
                                            src={news}
                                            alt="Third slide"
                                        />
                                    </a>
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
