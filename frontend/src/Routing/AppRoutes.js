import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'
import Register from '../components/Register/Register'
import GuardedRoute from './GuardedRoutes'
import Login from '../components/Login/Login'
import Stocks from '../components/Stocks/Stocks'
import StockDetails from '../components/StockDetails/StockDetails'
import Resources from '../components/Resources/Resources'

export default function AppRoutes() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/dashboard" element={<GuardedRoute component={Dashboard} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/stocks/details/:symbol" element={<StockDetails />} />
                <Route path="/resources" element={<Resources />} />
            </Routes>
        </BrowserRouter>
    )
}
