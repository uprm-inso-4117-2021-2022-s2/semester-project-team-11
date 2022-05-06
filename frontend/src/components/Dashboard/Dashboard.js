import React, { useState, useEffect } from 'react'
import NavbarComponent from "../Navbar/Navbar.js";
import { BsSearch, BsTrash, BsListNested } from "react-icons/bs";
import { Table, Modal, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { stockPricesRequest, stockQuote, marketNews } from '../../requests/FinnHub-Requests';
import { fetchUserStocks } from '../../requests/Stocker-Requests.js';
import { hosts } from '../../config/hosts';

export default function Dashboard() {

    const [searchWord, setSearchWord] = useState("");
    const [news, setNews] = useState([]);
    const [stocks, setStocks] = useState([])
    const [prices, setPrices] = useState([]);
    const [stats, setStats] = useState([]);
    const [symbol, setSymbol] = useState('');
    const [openDetails, setOpenDetails] = useState(false)
    const [quote, setQuote] = useState({})
    const [generalNews, setGeneralNews] = useState([])

    useEffect(() => {
        const userid = localStorage.getItem('userid')
        marketNews('general', {}, setGeneralNews)
        fetchUserStocks(userid, setStocks)
    }, [])

    useEffect(() => {
        setNews(generalNews.slice(0, 20))
    }, [generalNews])

    useEffect(() => {
        stocks.length && setSymbol(stocks[0])
    }, [stocks])

    useEffect(() => {
        const to = getUNIXDate()
        const from = to - 2592e3
        stockPricesRequest(symbol, 'D', from.toString(), to.toString(), setPrices)
    }, [symbol])

    useEffect(() => {
        if(!prices.t) return ;
        const stats = prices.t.map((t, index) => {
            const date = new Date(t*1000)
            return { date: date.toString(), price: prices.c[index]} 
        });
        setStats(stats)
    }, [prices])

    const getUNIXDate = () => {
        const date = new Date()
        return Math.floor(date.getTime()/1000)
    }

    const searchAction = (e) => {
        if (e.type === "click" || e.key === 'Enter') {
            const search = generalNews.filter(item => {
                const str = `${item.headline} ${item.summary} ${item.source} ${item.category} ${item.related}`
                return str.toLowerCase().includes(searchWord.toLowerCase())
            })
            setNews(search)
        }
    };

    const handleDetails = () => {
        stockQuote(`${symbol}`, setQuote)
        setOpenDetails(true)
    }

    const formatPosNeg = (cond, value, d) => cond ? `+${value.toFixed(d)}` : `${value.toFixed(d)}`

    const closeDetails = () => {
        setOpenDetails(false) 
        setQuote({})
    }

    const removeStock = async () => {
        const userid = localStorage.getItem('userid')
        const request = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'symbol' : `${symbol}` })
        };

        try{
            const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${userid}`, request)
            const data = await response.json()
            if(data){
                fetchUserStocks(userid, setStocks)
                return;
            }
            return ;
        }
        catch(e){
            console.log("Error");
            console.log(e)
            return ;
        }

    }

    const DetailsModal = () => {
        return (
            <Modal show={ openDetails && Object.keys(quote).length } onHide={ closeDetails }>
                <Modal.Header className='details-modal-header'>
                    <Modal.Title style={{textAlign: 'center'}}> {`${symbol} Today`} </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body' style={{textAlign: 'center', fontSize: '18px'}}>
                    <div className='stock-prices'>
                        <div id='stock-current'>
                            <label> Current Price </label>
                            <p><b>{ quote.c && quote.c !== 0 ? quote.c.toFixed(4) : '' }</b></p>
                        </div>
                        <div id='stock-high'>
                            <label> High </label>
                            <p>{ quote.h && quote.h !== 0 ? quote.h.toFixed(4) : '' }</p>
                        </div>
                        <div id='stock-low'>
                            <label> Low </label>
                            <p>{ quote.l && quote.l !== 0 ? quote.l.toFixed(4) : '' }</p>
                        </div>
                        <div id='stock-open'>
                            <label> Open </label>
                            <p>{ quote.o && quote.o !== 0 ? quote.o.toFixed(4) : '' }</p>
                        </div>
                        <div id='stock-previous'>
                            <label> Previous Close </label>
                            <p>{ quote.pc && quote.pc !== 0 ? quote.pc.toFixed(4) : '' }</p>
                        </div>
                        <div className={`${quote.d >= 0 ? 'green' : 'red'}`} id='stock-change'>
                            <label> Change </label>
                            <p>{ quote.d && quote.d !== 0 ? formatPosNeg(quote.d >= 0, quote.d, 4) : '' }</p>
                        </div>
                        <div className={`${quote.dp >= 0 ? 'green' : 'red'}`} id='stock-percent'>
                            <label> % Change </label>
                            <p>{ quote.dp && quote.dp !== 0 ? `${formatPosNeg(quote.dp >= 0, quote.dp, 2)}%` : '' }</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='button-link'>
                    <Button variant='tertiary' onClick={ closeDetails }> Close </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const nav = {stocks: true, news: true, resources: true, logout: true}

    return (

            <>
               <NavbarComponent nav={nav}/>
                <div className='container dashboard-flex-container'>
                    <div className='dashboard-left-container'>
                        <div className='dashboard-header-container'>
                            {localStorage.getItem('fname')}'s Dashboard
                        </div>
                        <div className='dashboard-current-stock'>
                            <LineChart
                                width={1000}
                                height={400}
                                data={stats}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tick={false} />
                                <YAxis interval="preserveEnd" domain={['auto']} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#8FC0A9"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </div>

                        <div className='search-container'>
                            <input type="text"
                                placeholder="Search for a keyword..."
                                value={searchWord}
                                name="searchWord"
                                className="searchbar"
                                onChange={(e) => setSearchWord(e.target.value)}
                                onKeyDown={searchAction}
                            />
                            < BsSearch name='search' className='search-icon' onClick={searchAction} style={{ margin: '5px' }} />
                        </div>
                        <div className='dashboard-news-container'>
                            {news.length !== 0 &&
                                <Table responsive>
                                    <tbody>
                                        {news.map((item, index) => (
                                            <tr onClick={() => window.open(item.url, '_blank', 'noreferrer')} key={index}>
                                                <td className='dashboard-news-box'>
                                                    <div>
                                                        <div><h6><b>{item.headline}</b></h6></div>
                                                        <div><p className='two-lines-text'>{item.summary}</p></div>
                                                    </div>
                                                    <img src={`${item.image}`} alt="" width="150" height="100" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            }
                        </div>
                    </div>
                    <div className='dashboard-right-container'>
                        <div className='news-sticky-header'>
                            <p>My Stocks</p>
                        </div>
                        {stocks.length > 0 &&
                            <Table>
                                <tbody>
                                    {stocks.map((stock, index) => (
                                        <tr key={index}>
                                            <td className={`dashboard-stocks ${symbol === stock ? 'active' : ''}`} onClick={ () => setSymbol(stock) }> 
                                                <div>{stock}</div>
                                                {symbol === stock && 
                                                    <div>
                                                        <BsTrash className='trash-button' size={18} onClick={ removeStock }/>
                                                        <BsListNested className='stock-details-btn' size={20} onClick={ handleDetails }/>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>}
                    </div>
                </div>
                <DetailsModal />
            </> 

    )
}
