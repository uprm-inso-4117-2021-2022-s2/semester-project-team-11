import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavbarComponent from "../Navbar/Navbar.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { stockProfile, stockQuote, stockPricesRequest } from '../../requests/FinnHub-Requests';

export default function StockDetails() {

    const { symbol } = useParams()
    const [profile, setProfile] = useState({})
    const [quote, setQuote] = useState({})
    const [stats, setStats] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const to = getUNIXDate()
        const from = to - 2592e3
        stockProfile(symbol, setProfile)
        stockQuote(symbol, setQuote)
        stockPricesRequest(symbol, 'D', from.toString(), to.toString(), setStats)
    }, [symbol])

    useEffect(() => {
        if(!stats.t) return;
        const data = stats.t.map((t, index) => {
            const date = new Date(t*1000)
            return { time: date.toString(), high: stats.h[index], low: stats.l[index], open: stats.o[index], close: stats.c[index]} 
        });
        setData(data)
    }, [stats])

    const getUNIXDate = () => {
        const date = new Date()
        return Math.floor(date.getTime()/1000)
    }

    const formatPosNeg = (cond, value, d) => cond ? `+${value.toFixed(d)}` : `${value.toFixed(d)}` 

    const GoBackButton = () => {
        return (
            <div className='go-back-link'>
                <Link to='/stocks' onClick={() => localStorage.setItem('fromDetails', true)}> {'< Back'} </Link>
            </div>
        )
    }

    const StockInfo = () => {
        return (
            <div className='stock-info'> 
                <h4> <b> { `${symbol}` } </b> </h4>
                <div className='stock-company'> 
                    <a href={`${profile.weburl }`} target='_blank' rel='noreferrer'> { profile.name } </a> 
                    { profile.finnhubIndustry && <label>{ profile.finnhubIndustry }</label> } 
                </div>
                <div className='stock-exchange'>
                    {profile.exchange && `${profile.exchange}, Currency in ${profile.currency}.`} 
                </div>
            </div>
        )
    }

    const StockData = () => {
        return (
            <div className='stock-data'>
                { stats.s === 'ok'  && stats.t.length !== 0 ? <StockGraph /> : <NoDataMessage /> }
                <div className='division-line'></div>
                <StockPrices />
            </div>
        )
    }

    const StockGraph = () => {
        return (
            <div className='stock-stats'>
                <ResponsiveContainer className='responsive-container' width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 0, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='time' tick={false}/>
                        <YAxis domain={['auto']} />
                        <Tooltip />
                        <Legend />
                        <Line type='monotone' dataKey='open' stroke='#e9c46a' activeDot={{ r: 8 }} />
                        <Line type='monotone' dataKey='close' stroke='#f4a261' />
                        <Line type='monotone' dataKey='high' stroke='#2a9d8f' />
                        <Line type='monotone' dataKey='low' stroke='#e76f51' />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        )
    }

    const NoDataMessage = () => {
        return (
            <div className='no-data-mssg'>
                No Data Available.
            </div>
        )
    }

    const StockPrices = () => {
        return(
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
                <div id='stock-market-cap'>
                    <label> Market Cap </label>
                    <p>{ profile.marketCapitalization }</p>
                </div>
            </div>
            
        )
    }

    return (
        <>
            <NavbarComponent nav={ localStorage.getItem('userid') ? false : true } />
            <div className='container'>
                <GoBackButton />
                <div className='stock-details'>
                    <StockInfo />
                    <StockData />
                </div>
            </div>
        </>
    )
}
