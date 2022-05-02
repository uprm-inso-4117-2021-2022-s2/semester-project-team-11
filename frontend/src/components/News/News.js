import {React,useState,useEffect} from 'react'
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { marketNews } from '../../requests/FinnHub-Requests';
import NavbarComponent from '../Navbar/Navbar';


export default function News() {

    const [searchWord, setSearchWord] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const [generalNews , setGeneralNews] = useState([])
    const [forexNews , setForexNews] = useState([])
    const [cryptoNews , setCryptoNews] = useState([])
    const [mergerNews , setMergerNews] = useState([])
    const [allNews , setAllNews] = useState([])
    

    useEffect(() => {
        marketNews('general', {}, setGeneralNews)
        marketNews('forex', {}, setForexNews)
        marketNews('crypto', {}, setCryptoNews)
        marketNews('merger', {}, setMergerNews)
    }, [])

    useEffect(() => {
        setAllNews([...generalNews, ...forexNews, ...cryptoNews, ...mergerNews])
    }, [generalNews, forexNews, cryptoNews, mergerNews])

    const searchAction = (e) => {

        if (e.type === "click" || e.key === 'Enter') {
            const search = allNews.filter(item => {
                const str = `${item.headline} ${item.summary} ${item.source} ${item.category} ${item.related}`
                return str.toLowerCase().includes(searchWord.toLowerCase())
            })
            setSearchResult(search)
        }
    }

    const searchBar =
        <div className='search-container'>
            <input type="text"
                placeholder="Search for a keyword..."
                value={searchWord}
                name="searchWord"
                className='searchbar'
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={searchAction}
                style={{width: '80%'}}
            />
            < BsSearch className='search-icon' name='search' onClick={searchAction} style={{ margin: '5px' }} />
        </div>;

    return (
        <>
        <NavbarComponent nav={ localStorage.getItem('userid') ? false : true }/>
        <div className='container news-flex-container'>
                <div className='news-left-container'>
                    {searchBar}
                    <div className='search-results-table'>
                        {searchResult.length !== 0 &&
                            <Table >
                                <tbody>
                                    {searchResult.map((item, index) => (
                                        <tr key={index}>
                                            <td className='left-news-box'>
                                                <img src={`${item.image}`} alt="" width="225" height="150" />
                                                <div>
                                                    <div><b style={{color:'#68b0ab'}}>{item.category.toUpperCase()}</b> {item.source}</div>
                                                    <div><h5 onClick={() => window.open(item.url, '_blank', 'noreferrer')}><b>{item.headline}</b></h5></div>
                                                    <div className='two-lines-text'>{item.summary}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>}
                    </div>
                
                </div>
                <div className='news-right-container'>
                    <div className='news-sticky-header'>
                        <p>YOU MAY ALSO LIKE</p>
                    </div>
                    {generalNews.length !== 0 &&
                        <Table >
                            <tbody>
                                {generalNews.slice(0,20).map((item, index) => (
                                    <tr onClick={() => window.open(item.url, '_blank', 'noreferrer')} key={index}>
                                        <td className='right-news-box'>
                                            <div>
                                                <h6>{item.category.toUpperCase()}</h6>
                                                <h6 className='three-lines-text'><b>{item.headline}</b></h6>
                                            </div>
                                            <img src={`${item.image}`} alt="" width="150" height="100" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>}
                </div>
            </div>
        </>
    )
}
