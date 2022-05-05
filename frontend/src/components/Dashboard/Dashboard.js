import React, { useState } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from '../../../src/images/Stocks_GrowthCombined.png';
import { BsSearch } from "react-icons/bs";
import { Table } from 'react-bootstrap';
import graph from '../../images/grafiquita-1.png'
import "./Dashboard.css"

export default function Dashboard() {

    const [searchWord, setSearchWord] = useState("");
    const [searchResult, setSearchResult] = useState({})

    const searchAction = (e) => {
        setSearchResult({}) // change
    };

    const searchBar =
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
        </div>;

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
                    <div className='dashboard-searchBar-container'>{searchBar}</div>



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
