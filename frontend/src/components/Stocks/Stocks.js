import React, { useState, useEffect } from 'react'
import { Nav, Button, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { BsSearch, BsFillArrowRightCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai'
import axios from 'axios'
import stockJSON from './stocks.json'
import NavbarComponent from "../Navbar/Navbar.js";

export default function Stocks() {

    const [stocks, setStocks] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')
    const [openRegisterModal, setOpenRegisterModal] = useState(false)

    useEffect(() => setStocks(stockJSON) || fetchTrending(), [])

    const fetchTrending = async () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/market/get-trending-tickers',
            params: {region: 'US'},
            headers: {
              'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
              'X-RapidAPI-Key': '55fd0197c9mshb601da3a6bf10cep1d2446jsn67e22822ba81'
            }
        };

        try{
            const { data }= await axios(options)
            setStocks(data.finance.result[0].quotes)
        }catch(e){
            console.error(e)
        }
    }

    const fetchSearch = () => {
        console.log('search:', searchKeyword)
    }

    const formatPosNeg = (cond, value, d) => cond ? `+${value.toFixed(d)}` : `${value.toFixed(d)}` 

    const saveStock = (stock) => {
        setOpenRegisterModal(true)
        console.log('save:', stock.symbol)
    }
    
    const NavComponent = <Nav className="ml-auto">
                            <Button variant='dark' className='nav-buttons' href='/register'> Register </Button>
                            <Button variant='dark' className='nav-buttons' href='/login'> Login </Button>
                        </Nav>

    const renderSearchBar = () => {
        return (
            <div className='search-container'>
                <input 
                type='text' 
                name='searchKeyword'
                value={ searchKeyword }
                placeholder='Search...'
                className='stocks-searchbar'
                onChange={ e => setSearchKeyword(e.target.value) }
                onKeyDown={ e => e.key === 'Enter' && fetchSearch() }>
                </input>
                < BsSearch className='search-icon' name='search' size={20} onClick={ () => fetchSearch() } />
            </div>
        )

    }

    const renderStocks = () => {
        return(
            <>
                <Table className='stocks-table' size='sm'>
                    <thead className='table-header'>
                        <tr className='header-row'>
                            <th className='table-column first-column'>Symbol</th>
                            <th className='table-column'>Name</th>
                            <th className='table-column'>Last Price</th>
                            <th className='table-column'>Change</th>
                            <th className='table-column'>% Change</th>
                            <th className='table-column'>Save</th>
                            <th className='table-column'>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.length !== 0 && stocks.map(stock => {
                            const isChangePos = stock.regularMarketChange >= 0 
                            const isPercentPos = stock.regularMarketChangePercent >= 0
                            return (
                                <tr className='table-row' key={stock.symbol}> 
                                    <td className='record-value first-column'>{ stock.symbol }</td>
                                    <td className='record-value'>{ stock.shortName }</td>
                                    <td className='record-value'>{ stock.regularMarketPrice.toFixed(2) }</td>
                                    <td className={ isChangePos ? `record-value green` : `record-value red` }> { formatPosNeg(isChangePos, stock.regularMarketChange, 4) }</td>
                                    <td className={ isPercentPos ? `record-value green` : `record-value red` }> { formatPosNeg(isPercentPos, stock.regularMarketChangePercent, 2) + '%'}</td>
                                    <td className='record-value actions'>
                                        <BsPlusCircleFill className='add-button' size={30} onClick={ () => saveStock(stock) }/>
                                    </td>
                                    <td className='record-value actions'>
                                        <Link to={`/stocks/details/${stock.symbol}`}>
                                            <BsFillArrowRightCircleFill className='details-button' size={30}/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                { stocks.length === 0 && <p style={{textAlign: 'center'}}> No results found. </p>}
            </>
        )
    }

    const renderRegisterModal = () => {
        return(
            <Modal show={ openRegisterModal } onHide={ () => setOpenRegisterModal(false) }>
                <Modal.Header>
                    <Modal.Title> Don't have an account yet? <AiOutlineStock size={40}/></Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <p>In order to be able to save stocks you must be registered.</p> 
                    <p>Once registered, you will be provided with a Dashboard where all your saved stocks will be available to you.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='modal-buttons' variant='tertiary' onClick={ () => setOpenRegisterModal(false) }> Cancel </Button>
                    <Button variant="dark" className='modal-buttons' href='/register'> Join Us </Button>
                </Modal.Footer>
            </Modal>
        )
    } 
    

    return(
        <>
            <NavbarComponent NavComponent={ NavComponent } />
            <div className='container'>
                { renderSearchBar() }
                { renderStocks() }
                { renderRegisterModal() }
            </div>
            
        </>
    )


}