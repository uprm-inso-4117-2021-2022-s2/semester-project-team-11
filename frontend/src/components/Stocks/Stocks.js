import React, { useState, useEffect} from 'react'
import { Button, Table, Modal, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { BsSearch, BsFillArrowRightCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { stockSearch } from '../../requests/FinnHub-Requests';
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
        fetchUserStocks()
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

    const fetchUserStocks = async () => {
        const userid = localStorage.getItem('userid')
        if(!userid){ return ; }

        try{
            const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${userid}`)
            const data = await response.json()
            const stocks = data.map(stock => stock.symbol[0])
            setUserStocks(stocks)
        }
        catch(e){
            console.log("Error");
            localStorage.clear();
            console.log(e)
        }
    }

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

    const handleStock = async (stock) => {
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
                body: JSON.stringify({ 'symbol' : stock.symbol })
            };
    
            try{
                const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${userid}`, request)
                const data = await response.json()
                if(data === 'STOCK WAS REMOVED SUCCESSFULLY.'){
                    const filtered = userStocks.filter(symbol => symbol !== stock.symbol )
                    setUserStocks(filtered)
                }
                console.log(data)
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
            body: JSON.stringify({ 'symbol' : stock.symbol })
        };

        try{
            const response = await fetch(`${hosts['heroku']}/stocker/stock/savedStocks/${userid}`, request)
            const data = await response.json()
            if(data === 'STOCK WAS SAVED SUCCESSFULLY.'){
                setUserStocks([...userStocks, stock.symbol])
            }
            console.log(data)
        }
        catch(e){
            console.log("Error");
            console.log(e)
        }
        
    }

    const saveState = () => {
        const state = { stocks, currentPage, title, searchKeyword }
        localStorage.setItem('stocksState', JSON.stringify(state))
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
                            <th className='table-column'>Save/Remove</th>
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
                                        <BsPlusCircleFill className={userStocks.includes(stock.symbol) ? 'remove-button' : 'add-button'} size={30} onClick={ () => handleStock(stock) }/>
                                    </td>
                                    <td className='record-value actions'>
                                        <Link to={`/stocks/details/${stock.symbol}`} onClick={ saveState }>
                                            <BsFillArrowRightCircleFill className='details-button' size={30} />
                                        </Link>
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
                <Modal.Footer className='button-link'>
                    <Button variant='tertiary' onClick={ () => setOpenRegisterModal(false) }> Cancel </Button>
                    <Button variant="dark" href='/register'> Join Us </Button>
                </Modal.Footer>
            </Modal>
        )
    } 
    
    return(
        <>
            <NavbarComponent nav={ localStorage.getItem('userid') ? false : true } />
            <div className='container'>
                { renderSearchBar() }
                <h3 style={{paddingLeft: '15%'}}>{ title }</h3>
                <Stocks />
                <RegisterModal />
            </div>
            
        </>
    )


}