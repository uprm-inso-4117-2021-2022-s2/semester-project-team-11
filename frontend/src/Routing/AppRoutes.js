import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard/Dashboard'
import Home from '../components/Home/Home'
import Register from '../components/Register/Register'
import GuardedRoute from './GuardedRoutes'

export default function AppRoutes() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<GuardedRoute component={Dashboard} />} />
            </Routes>
        </BrowserRouter>
    )
}
