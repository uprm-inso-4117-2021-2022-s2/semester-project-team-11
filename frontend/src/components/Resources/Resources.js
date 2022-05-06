import React from 'react'
import NavbarComponent from '../Navbar/Navbar';
import stock_image from '../../../src/images/Resources-Stock-Image-1.jpg'
import fidelity_image from '../../../src/images/fidelity-logo.png'



const Resources = () => {

    const nav1 = {login: true, register: true}
    const nav2 = {dashboard: true, stocks: true, news: true, logout: true}

    return (
        <>
            <NavbarComponent nav={ localStorage.getItem('userid') ? nav2 : nav1 }/>
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