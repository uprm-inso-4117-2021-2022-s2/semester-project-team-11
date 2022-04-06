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

            </div>
        </div>
      </div>
      </>
  )
}

export default Resources