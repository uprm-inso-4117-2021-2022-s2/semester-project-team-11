import React, { useState, useEffect} from 'react'
import NavbarComponent from '../Navbar/Navbar';
import { BsSearch, BsFillArrowRightCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { indicatorRequest } from '../../requests/FinnHub-Requests';
import { hosts } from '../../config/hosts';
import './Indicators.css'

const Indicators = () => {
    const [indicators, setIndicators] = useState({})
    const [loading, setLoading] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchIndKeyword, setSearchIndKeyword] = useState('')
    const [title, setTitle] = useState('')
    const [userStocks, setUserStocks] = useState([])


    useEffect(() => {
        const storage = localStorage.getItem('indicatorsState')
        const restore = localStorage.getItem('fromIndicatorDetails')
        if(storage && restore){
            const state = JSON.parse(storage)
            setIndicators(state.indicators)
            setSearchKeyword(state.searchKeyword)
            setSearchIndKeyword(state.searchIndKeyword)
        }else{
            setLoading(true)
            setTitle('Indicators')
            indicatorRequest('', '', setIndicators)
        }
        fetchUserStocks()
        localStorage.removeItem('indicatorsState')
        localStorage.removeItem('fromIndicatorDetails')
    }, [])


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

    const fetchIndicatorSearch = () => {
        const title = searchKeyword === '' ? 'Indicators' : `Search for indicators of '${searchKeyword}'`
        resetIndicatorStates()
        setTitle(title)
        setLoading(true)
        indicatorRequest(searchKeyword, searchIndKeyword, setIndicators)
    }

    const resetIndicatorStates = () => {
        setIndicators({})
    }
    return (
        <>
        <NavbarComponent  nav={localStorage.getItem('userid') ? false : true }/>
        <div className='indicators-container'>
            <h3 style={{paddingLeft: '15%'}}>{ title }</h3>
        </div>
        </>
    )
}

export default Indicators