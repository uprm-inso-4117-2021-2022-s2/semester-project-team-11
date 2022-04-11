import {React,useState} from 'react'
import { Table,Navbar,Container } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import axios from 'axios';
import logo from '../../../src/images/Stocks_GrowthCombined.png';
import "./News.css"


export default function News() {

    const [searchWord, setSearchWord] = useState("");
    const [searchResult, setSearchResult] = useState({})

    const [searchResultGlobal , setSearchResultGlobal] = useState({})


    const searchRequest = {
        method: 'GET',
        url: 'https://newsapi.org/v2/everything',
        params: {q: searchWord, sortBy: 'publishedAt', apiKey: "360ced0df45347fdb65522b2e8bf373a" },
      };

    
    const globalNews = {
        method: 'GET',
        url: 'https://newsapi.org/v2/everything',
        params: {q: "global news", sortBy: 'publishedAt', apiKey: "360ced0df45347fdb65522b2e8bf373a" },
      };



    const searchAction = (e) => {

        if (e.type === "click" || e.key === 'Enter') {
            axios.request(searchRequest).then(function (response) {
                setSearchResult(response.data);
            }).catch(function (error) { 
                console.error(error);

            })
        }
        axios.request(globalNews).then(function (response) {
            setSearchResultGlobal(response.data);
        }).catch(function (error) { 
            console.error(error);

        })

    }

    const searchBar =
        <div className='news-searchBar-container'>
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
        <Navbar className="color-nav">
            <Container>
            <Navbar.Brand href="/">
                  <img
                  alt=""
                  src={logo}
                  width="120"
                  height="50"
                  className="d-inline-block align-top"
                      />{' '}
                </Navbar.Brand>
            </Container>
        </Navbar>
        

        <div className='news-flex-container'>
                <div className='news-left-container'>
                    <div className='news-searchBar-container'>{searchBar}</div>
                
                    {searchResult.articles &&
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th key={1}>News Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResult.articles.map((item) => (
                                    <tr>
                                        <img src={`${item.urlToImage}`} alt="" width="200" height="150" />
                                        <td key={item.key}>
                                            <div><h5><b>{item.title}</b></h5></div>
                                             <div>{item.description}</div>
                                             <div><a href={item.url}>Read More</a></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </div>
                <div className='news-right-container'>
                    {searchResultGlobal.articles &&
                        <Table>
                            <thead>
                                <tr>
                                    <th key={3}>YOU MAY ALSO LIKE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResultGlobal.articles.map((item) => (
                                    <tr>
                                        <img src={`${item.urlToImage}`} alt="" width="200" height="150" />
                                        <td key={item.key}>
                                            <div><h5><b>{item.title}</b></h5></div>
                                             <div>{item.description}</div>
                                             <div><a href={item.url}>Read More</a></div>
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
