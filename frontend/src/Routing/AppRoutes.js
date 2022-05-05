import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'
import Register from '../components/Register/Register'
import GuardedRoute from './GuardedRoutes'
import News from '../components/News/News'
import Login from '../components/Login/Login'
import Stocks from '../components/Stocks/Stocks'
import StockDetails from '../components/StockDetails/StockDetails'
import Resources from '../components/Resources/Resources'

export default function AppRoutes() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<GuardedRoute component={Dashboard} />} />
                <Route path="/news" element={<News />}/>
                <Route path="/resources" element={<Resources />}/>
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/stocks/details/:symbol" element={<StockDetails />} />
            </Routes>
        </BrowserRouter>
    )
    
}