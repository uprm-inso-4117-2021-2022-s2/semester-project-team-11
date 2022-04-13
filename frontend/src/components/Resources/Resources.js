import React from 'react'
import './Resources.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container, Col, Row } from "react-bootstrap";
import logo from '../../../src/images/Stocks_GrowthCombined.png';



const Resources = () => {
  return (
      <>
      <Navbar className="color-nav">
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
          </Container>
      </Navbar>
      <div className='resources-container'>
        <div className='resources-upper-sidescroll'>
            <div className='resources-sidescroll-items'></div>
            <div className='resources-sidescroll-items'></div>
            <div className='resources-sidescroll-items'></div>
            <div className='resources-sidescroll-items'></div>
            <div className='resources-sidescroll-items'></div>
            <div className='resources-sidescroll-items'></div>
            <div className='resources-sidescroll-items'></div>
        </div>
        <div className='resources-lower-zone'>
            <div className='resources-review-corner'>
                <h1>Online Broker Reviews</h1>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
                <div className='resources-review-items'></div>
            </div>
            <div className='resources-tips-tricks'>
                <h1>The Basics</h1>
                <div className='resources-tips-items'>
                    <h4>What's an IRA?</h4>
                    <p>An IRA is an account set up at a financial institution that allows an individual to save for retirement with tax-free growth or on a tax-deferred basis.  </p>
                </div>
                <div className='resources-tips-items'>
                    <h4>What's an IRA?</h4>
                    <p>An IRA is an account set up at a financial institution that allows an individual to save for retirement with tax-free growth or on a tax-deferred basis.  </p>
                </div><div className='resources-tips-items'>
                    <h4>What's an IRA?</h4>
                    <p>An IRA is an account set up at a financial institution that allows an individual to save for retirement with tax-free growth or on a tax-deferred basis.  </p>
                </div>
            </div>
        </div>
      </div>
      </>
  )
}

export default Resources