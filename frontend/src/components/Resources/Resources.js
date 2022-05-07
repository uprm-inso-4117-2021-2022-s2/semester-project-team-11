import React from 'react'
import NavbarComponent from '../Navbar/Navbar';
import stock_image from '../../../src/images/Resources-Stock-Image-1.jpg'
import stock_image2 from '../../../src/images/stock_image_indicator.jpeg'
import stock_image3 from '../../../src/images/stock_market_.jpeg'
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
                            <a href="https://www.investopedia.com/terms/e/economic_indicator.asp">
                                <img src={stock_image2} alt="res_1" />

                            </a>
                            <h4>Economic Indicator</h4>
                            <p>by Adam Barone</p>
                        </div>
                    </div>
                    <div className='resources-sidescroll-items'>
                        <div className='resources-sidescroll-flex'>
                            <a href="https://www.investopedia.com/terms/s/stockmarket.asp">
                                <img src={stock_image3} alt="res_1" />

                            </a>
                            <h4>Stock Market</h4>
                            <p>by  James Chen </p>
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
                                <p><b>Ameritrade Investments Review</b></p> 
                                <p>TD Ameritrade’s strength in investor education flows naturally to TDA being one of the smoothest introductions to the market for new investors. There are, of course, brokers that do it cheaper or flashier, but TD Ameritrade has the resources, range of offerings, and the support that will help new investors become better over the long-term. Major factors in choosing the TD Ameritrade brokerage account include the expanded learning pathways covering everything from beginning to invest to advanced trading, and the ability to paper trade on the platform without making any commitment. TD Ameritrade makes a very compelling case for being the brokerage account that new investors choose because it manages to be a comprehensive and robust platform without being overwhelming.</p>
                            </div>
                        </div>
                        <div className='resources-review-items'>
                            <img src={fidelity_image} alt="fidelity-logo" />
                            <div className='resources-review-item-text'>
                                <p><b>tastyworks Investments Review</b></p> 
                                <p>Tastyworks remains very competitive on price when it comes to trading options contracts. Still, what makes it our pick as the best broker for options traders are the flexible tools, educational content, and intuitive platforms. Tastyworks isn't the broker you start options trading on—it is the one you end up choosing once you've decided options trading is all you want to do. Tastyworks is optimized for this task in a way that few other brokers are. Options traders will find all the tools and analysis they need during trading sessions, and they can spend their downtime consuming options-related content to get ready for the next session.</p>
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
                            <h4>What is the Stock Market?</h4>
                            <p>The stock market is where buyers and sellers come together to trade shares in eligible companies. </p>
                        </div>
                        <div className='resources-tips-items'>
                            <h4>What is an Investment?</h4>
                            <p>An investment is an asset bought by an individual or organization with the expectation that it will generate some future income or profit—Examples of investments may include stocks and real estate.</p>
                        </div>
                        <div className='resources-tips-items'>
                            <h4>What is a Stock?</h4>
                            <p>A stock is a unit of ownership in a company — If you own a stock, that makes you a shareholder, meaning that you may be eligible to receive dividends if the company succeeds and you may have a vote in some company decisions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resources