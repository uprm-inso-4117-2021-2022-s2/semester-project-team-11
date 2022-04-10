import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from '../../../src/images/Stocks_GrowthCombined.png';
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Table } from 'react-bootstrap';
import graph from '../../images/grafiquita-1.png'
import "./Dashboard.css"

export default function Dashboard() {

    const [searchWord, setSearchWord] = useState("");
    const [searchResult, setSearchResult] = useState({});
    const [stock, setStock] = useState([]);

    useEffect(() => {
        const stockRequest = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-chart',
            params: { interval: '5m', symbol: 'fb', range: '1d', region: 'US' },
            headers: {
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
                'X-RapidAPI-Key': 'feac1ad6damshf3407a191632ab5p10c29djsnacfead750eb3'
            }
        };

        axios.request(stockRequest).then(function (response) {
            const indicators = response.data.chart.result[0].indicators.quote[0].close;
            const timestamp = response.data.chart.result[0].timestamp;

            for (let index = 0; index < indicators.length; index++) {
                var utcSeconds = timestamp[index];
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                const data = { Symbol: 'FB', Date: d, Close: indicators[index] };
                setStock(stock.concat(data));
                console.log(data)
            }
        }).catch(function (error) {
            console.error(error);
        });
    }, [])


    const searchRequest = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/auto-complete',
        params: { q: searchWord, region: 'US' },
        headers: {
            'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
            'X-RapidAPI-Key': 'feac1ad6damshf3407a191632ab5p10c29djsnacfead750eb3'
        }
    };

    const searchAction = (e) => {
        if (e.type === "click" || e.key === 'Enter') {
            axios.request(searchRequest).then(function (response) {
                setSearchResult(response.data);
                console.log(searchResult.quotes)
            }).catch(function (error) {
                console.error(error);
            });
        }
    };

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
                        />
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        {/* buttons */}
                    </Nav>
                </Container>
            </Navbar>
            <div className='dashboard-flex-container'>
                <div className='dashboard-left-container'>
                    <div className='dashboard-header-container'>
                        {localStorage.getItem('fname')}'s Dashboard
                    </div>
                    <div className='dashboard-current-stock '>
                        <img src={graph} alt="stock" />
                    </div>
                    <div className='dashboard-searchBar-container'>
                        <div className='dashboard-searchBar-container'>
                            <input type="text"
                                placeholder="Search for a keyword..."
                                value={searchWord}
                                name="searchWord"
                                onChange={(e) => setSearchWord(e.target.value)}
                                onKeyDown={searchAction}
                                style={{ height: 40, width: "80%", borderRadius: 15, borderColor: 'white', backgroundColor: "lightgray" }}
                            />
                            < BsSearch name='search' onClick={searchAction} style={{ margin: '5px' }} />
                        </div></div>
                    {searchResult.quotes &&
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th key={0}>Stock Results</th>
                                </tr>
                                <tr>
                                    <td key={2}>Symbol</td>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.quotes.map((item) => (
                                    <tr>
                                        <td key={item.key}>{item.symbol}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    }
                    {searchResult.news &&
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th key={1}>News Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.news.map((item) => (
                                    <tr>
                                        <td key={item.key}>{item.link}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </div>
                <div className='dashboard-right-container'>
                    {searchResult.news &&
                        <Table>
                            <thead>
                                <tr>
                                    <th key={3}>My Stocks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.news.map((item) => (
                                    <tr>
                                        <td key={item.key}>{item.link}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>}
                </div>
            </div>
        </>
    )
}
