import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from '../../../src/images/Stocks_GrowthCombined.png';
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Table } from 'react-bootstrap';
import graph from '../../images/grafiquita-1.png'
import "./Dashboard.css"
import {
    AreaChart,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area
} from "recharts";
const dataEx = {
    "chart": {
        "result": [
            {
                "timestamp": [
                    1645016400
                    , 1645016700
                    , 1645017000
                    , 1645020600
                    , 1645021800
                    , 1645022100
                    , 1645022400
                    , 1645022700
                    , 1645023000
                    , 1645023300
                    , 1645023600
                    , 1645023900
                    , 1645024200
                    , 1645024500
                    , 1645024800
                    , 1645025100
                    , 1645025400
                    , 1645025700
                    , 1645026000
                    , 1645026300
                    , 1645026600
                    , 1645026900
                    , 1645027200
                    , 1645027239
                ],
                "indicators": {
                    "quote": [
                        {
                            "close": [
                                3.64
                                , 3.61
                                , 3.58
                                , 3.58
                                , 3.5
                                , 3.4600000381469727
                                , 3.430000066757202
                                , 3.450000047683716
                                , 3.430000066757202
                                , 3.4149999618530273
                                , 3.426300048828125
                                , 3.4549999237060547
                                , 3.4672000408172607
                                , 3.4600000381469727
                                , 3.464400053024292
                                , 3.4800000190734863
                                , 3.4649999141693115
                                , 3.4727001190185547
                                , 3.4844000339508057
                                , 3.4999001026153564
                                , 3.499799966812134
                                , 3.5
                                , 3.5
                                , 3.499500036239624
                            ]
                        }
                    ]
                }
            }
        ],
        "error": null
    }
};

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

        // axios.request(stockRequest)
        //     .then(function (response) {

        let fbStock = [];
        const indicators = dataEx.chart.result[0].indicators.quote[0].close;
        const timestamp = dataEx.chart.result[0].timestamp;

        for (let index = 0; index < indicators.length; index++) {
            var utcSeconds = timestamp[index];
            var d = new Date(0);
            d.setUTCSeconds(utcSeconds);
            const data = { symbol: 'FB', date: d, price: indicators[index] };
            fbStock.push(data);
            console.log(data)
        }
        setStock([...fbStock])

        // }).catch(function (error) {
        //     console.error(error);

    }
        , [])



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

        stock.length > 0 ?
            <>
                < Navbar className="color-nav" >
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
                </Navbar >
                <div className='dashboard-flex-container'>
                    <div className='dashboard-left-container'>
                        <div className='dashboard-header-container'>
                            {localStorage.getItem('fname')}'s Dashboard
                        </div>
                        <div className='dashboard-current-stock'>
                            {/* <img src={graph} alt="stock" /> */}
                            <LineChart
                                width={1000}
                                height={300}
                                data={stock}
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
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
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
            </> : <>Loading...</>

    )
}
