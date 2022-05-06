import React, { useState, useEffect} from 'react'
import { Button, Table, Modal, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { BsSearch, BsFillArrowRightCircleFill, BsPlusCircleFill, BsDashCircleFill } from 'react-icons/bs';
import { stockSearch } from '../../requests/FinnHub-Requests';
import { fetchUserStocks } from '../../requests/Stocker-Requests.js';
import { AiOutlineStock } from 'react-icons/ai'
import NavbarComponent from "../Navbar/Navbar.js";
import { hosts } from '../../config/hosts';

export default function Stocks() {

    const [stocks, setStocks] = useState({})
    const [loading, setLoading] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [openRegisterModal, setOpenRegisterModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [stocksPage, setStocksPage] = useState([])
    const [userStocks, setUserStocks] = useState([])
    const [title, setTitle] = useState('')

    const history = useNavigate()

    useEffect(() => {
        const storage = localStorage.getItem('stocksState')
        const restore = localStorage.getItem('fromDetails')
        if(storage && restore){
            const state = JSON.parse(storage)
            setStocks(state.stocks)
            setCurrentPage(state.currentPage)
            setTitle(state.title)
            setSearchKeyword(state.searchKeyword)
        }else{
            setLoading(true)
            setTitle('Stocks')
            stockSearch('', setStocks)
        }
        const userid = localStorage.getItem('userid')
        if(!userid) return ; 
        fetchUserStocks(userid, setUserStocks)
        localStorage.removeItem('stocksState')
        localStorage.removeItem('fromDetails')
    }, [])

    useEffect(() => {
        const last = parseInt(stocks.count / 15) + 1
        setLastPage(last)
    }, [stocks])

    useEffect(() => {
        const start = (currentPage - 1) * 15;
        const end = currentPage * 15 < stocks.count ? currentPage * 15 : stocks.count ? stocks.count : 0;
        stocks.result && setStocksPage(stocks.result.slice(start, end))
        stocks.result && setLoading(false)
    }, [stocks, currentPage])

    const fetchSearch = () => {
        const title = searchKeyword === '' ? 'Stocks' : `Search for '${searchKeyword}'`
        resetStocksStates()
        setTitle(title)
        setLoading(true)
        stockSearch(searchKeyword, setStocks)
    }

    const resetStocksStates = () => {
        setStocks({})
        setStocksPage([])
        setCurrentPage(1)
        setLastPage(1)
    }

    const handleAddRemove = async (stock) => {
        const userid = localStorage.getItem('userid')
        if(!userid){
            setOpenRegisterModal(true)
            return ;
        }

        if(userStocks.includes(stock.symbol)){
            const request = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'symbol' : `${stock.symbol}` })
            };
    
            try{
                const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${userid}`, request)
                const data = await response.json()
                if(data){
                    fetchUserStocks(userid, setUserStocks)
                }
                return ;
            }
            catch(e){
                console.log("Error");
                console.log(e)
                return ;
            }

        }
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'symbol' : `${stock.symbol}` })
        };

        try{
            const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${userid}`, request)
            const data = await response.json()
            if(data){
                fetchUserStocks(userid, setUserStocks)
            }
            console.log(data)
        }
        catch(e){
            console.log("Error");
            console.log(e)
        }
        
    }

    const handleDetails = (stock) => {
        const state = { stocks, currentPage, title, searchKeyword }
        localStorage.setItem('stocksState', JSON.stringify(state))
        history(`/stocks/details/${stock.symbol}`)
    }

    const renderSearchBar = () => {
        return (
            <div className='search-container'>
                <input 
                    type='text' 
                    name='searchKeyword'
                    value={ searchKeyword }
                    placeholder='Search...'
                    className='searchbar'
                    onChange={ e => setSearchKeyword(e.target.value) }
                    onKeyDown={ e => e.key === 'Enter' && fetchSearch() }>
                </input>
                < BsSearch className='search-icon' name='search' size={20} onClick={ () => fetchSearch() } />
            </div>
        )

    }

    const Stocks = () => {
        return(
            <div className='stocks-container'>
                <Table className='stocks-table' size='sm'>
                    <thead className='table-header'>
                        <tr className='header-row'>
                            <th className='table-column first-column'>Symbol</th>
                            <th className='table-column'>Name</th>
                            <th className='table-column'>Add/Remove</th>
                            <th className='table-column'>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocksPage.length !== 0 && stocksPage.map((stock, index) => {
                            return (
                                <tr className='table-row' key={index}> 
                                    <td className='record-value first-column'>{ stock.symbol }</td>
                                    <td className='record-value'>{ stock.description }</td>
                                    <td className='record-value actions'>
                                        {userStocks.includes(stock.symbol) ? 
                                        <BsDashCircleFill className='remove-button' size={30} onClick={ () => handleAddRemove(stock) }/> :
                                        <BsPlusCircleFill className='add-button' size={30} onClick={ () => handleAddRemove(stock) }/>
                                        }
                                    </td>
                                    <td className='record-value actions'>
                                        <BsFillArrowRightCircleFill className='details-button' size={30} onClick={ () => handleDetails(stock) }/>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                { loading ? <p style={{textAlign: 'center'}}> { 'Loading...' } </p> : !stocks.count ? <p style={{textAlign: 'center'}}> { 'No Results' } </p> : null}
                { stocksPage.length !== 0 && <PageControls /> }
            </div>
        )
    }

    const PageControls = () => {
        return(
                <Pagination className='pagination-component'>
                    {currentPage - 3 > 0 && <Pagination.First onClick={ () => setCurrentPage(1) }/>}
                    {currentPage - 3 > 0 && <Pagination.Prev onClick={ () => setCurrentPage(currentPage - 1) }/>}
                    {currentPage - 2 > 0 && <Pagination.Item onClick={ () => setCurrentPage(currentPage - 2) }>{currentPage - 2}</Pagination.Item>}
                    {currentPage - 1 > 0 && <Pagination.Item onClick={ () => setCurrentPage(currentPage - 1) }>{currentPage - 1}</Pagination.Item>}
                    <Pagination.Item active id={currentPage}>{currentPage}</Pagination.Item>
                    {currentPage + 1 <= lastPage && <Pagination.Item onClick={ () => setCurrentPage(currentPage + 1) }>{currentPage + 1}</Pagination.Item>}
                    {currentPage + 2 <= lastPage && <Pagination.Item onClick={ () => setCurrentPage(currentPage + 2) }>{currentPage + 2}</Pagination.Item>}
                    {currentPage + 3 <= lastPage && <Pagination.Next onClick={ () => setCurrentPage(currentPage + 1) }/>}
                    {currentPage + 3 <= lastPage && <Pagination.Last onClick={ () => setCurrentPage(lastPage) }/>}
                </Pagination>
        )
    }

    const RegisterModal = () => {
        return(
            <Modal show={ openRegisterModal } onHide={ () => setOpenRegisterModal(false) }>
                <Modal.Header>
                    <Modal.Title> Don't have an account yet? <AiOutlineStock size={40}/></Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <p>In order to be able to save stocks you must be registered.</p> 
                    <p>Once registered, you will be provided with a Dashboard where all your saved stocks will be available to you.</p>
                </Modal.Body>
                <Modal.Footer className='btn-container'>
                    <Button variant='tertiary' onClick={ () => setOpenRegisterModal(false) }> Cancel </Button>
                    <Button variant='primary' onClick={() => history('/register')}> Join Us </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    
    const nav1 = {login: true, register: true}
    const nav2 = {dashboard: true, news: true, resources: true, logout: true}
    
    return(
        <>
            <NavbarComponent nav={ localStorage.getItem('userid') ? nav2 : nav1 } />
            <div className='container'>
                { renderSearchBar() }
                <h3 style={{paddingLeft: '15%'}}>{ title }</h3>
                <Stocks />
                <RegisterModal />
            </div>
            
        </>
    )


}