import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap';
import NavbarComponent from "../Navbar/Navbar.js";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

export default function StockDetails() {
    const { symbol } = useParams()
    const [stockDetails, setStockDetails] = useState({})

    const NavComponent = <Nav className="ml-auto">
                            <Button variant='dark' className='nav-buttons' href='/register'> Register </Button>
                            <Button variant='dark' className='nav-buttons' href='/login'> Login </Button>
                        </Nav>

    return (
        <>
            <NavbarComponent NavComponent={ NavComponent }/>
            <div className='container'>
                <Link to='/stocks' className='go-back-link'>
                    <BsFillArrowLeftCircleFill className='go-back-button' size={25} />Back
                </Link>
                <div className='stock-details'>{`StockDetails ${symbol}`}</div>
            </div>
        </>
    )
}
