import React, { useEffect, useState } from 'react'
import { stockPricesRequest, stockSearch, marketNews, stockDetails } from '../requests/FinnHub-Requests'

//THIS IS JUST AN EXAMPLE FILE
export default function FinnHub() {
    const [prices, setPrices] = useState([])
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState([]);
    const [details, setDetails] = useState({})

    useEffect(() => {
        stockPricesRequest("AAPL", "1", 1649635200, 1649721599, setPrices)
        stockSearch("Meta", setSearch);
        marketNews("general", setNews);
        stockDetails('AAPL', setDetails);
    }, []);

    return (
        <>
            {prices.c && prices.c.length > 0 ? prices.c.map((item, index) => <div key={`1-${index}`}>{index} : {item}</div>) : <></>}
            {news.length > 0 ? news.map((item, index) => <div key={`2-${index}`}>{index} : {item.headline}</div>) : <></>}
            {search.result && search.result.length > 0 ? search.result.map((item, index) => <div key={`3-${index}`}>{index} : {item.description}</div>) : <></>}
            {details.length > 0 ? <div key={`4}`}> {details.ticker} - {details.name} - {details.exchange} </div> : <></>}
        </>
    )
}
