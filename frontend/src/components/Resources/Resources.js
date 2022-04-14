import React from 'react'
import './Resources.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container, Col, Row } from "react-bootstrap";
import logo from '../../../src/images/Stocks_GrowthCombined.png';
import stock_image from '../../../src/images/Resources-Stock-Image-1.jpg'
import fidelity_image from '../../../src/images/fidelity-logo.png'



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
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
            <div className='resources-sidescroll-items'>
                <div className='resources-sidescroll-flex'>
                    <a href="https://apogeeinfluence.com/how-to-invest-in-stocks/">
                        <img src={stock_image} alt="res_1" />

                    </a>
                    <h4>How to Invest in Stocks</h4>
                    <p>by Arielle O’Shea</p>
                </div>
            </div>
        </div>
        <div className='resources-lower-zone'>
            <div className='resources-review-corner'>
                <h1>Online Broker Reviews</h1>
                <div className='resources-review-items'>
                    <img src={fidelity_image} alt="fidelity-logo" />
                    <div className='resources-review-item-text'>
                        <p><b>Fidelity Investments Review</b></p> 
                        <p>Fidelity is one of the most well-rounded brokerages available today, with no commissions on stock, ETF or options trades and a selection of no-expense-ratio index funds.</p>
                    </div>
                </div>
                <div className='resources-review-items'>
                    <img src={fidelity_image} alt="fidelity-logo" />
                    <div className='resources-review-item-text'>
                        <p><b>Fidelity Investments Review</b></p> 
                        <p>Fidelity is one of the most well-rounded brokerages available today, with no commissions on stock, ETF or options trades and a selection of no-expense-ratio index funds.</p>
                    </div>
                </div>
                <div className='resources-review-items'>
                    <img src={fidelity_image} alt="fidelity-logo" />
                    <div className='resources-review-item-text'>
                        <p><b>Fidelity Investments Review</b></p> 
                        <p>Fidelity is one of the most well-rounded brokerages available today, with no commissions on stock, ETF or options trades and a selection of no-expense-ratio index funds.</p>
                    </div>
                </div>
                <div className='resources-review-items'>
                    <img src={fidelity_image} alt="fidelity-logo" />
                    <div className='resources-review-item-text'>
                        <p><b>Fidelity Investments Review</b></p> 
                        <p>Fidelity is one of the most well-rounded brokerages available today, with no commissions on stock, ETF or options trades and a selection of no-expense-ratio index funds.</p>
                    </div>
                </div>

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
                </div>
                <div className='resources-tips-items'>
                    <h4>What's an IRA?</h4>
                    <p>An IRA is an account set up at a financial institution that allows an individual to save for retirement with tax-free growth or on a tax-deferred basis.  </p>
                </div>
                <div className='resources-tips-items'>
                    <h4>What's an IRA?</h4>
                    <p>An IRA is an account set up at a financial institution that allows an individual to save for retirement with tax-free growth or on a tax-deferred basis.  </p>
                </div>
                <div className='resources-tips-items'>
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