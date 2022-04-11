import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import Register from '../components/Register/Register'
import News from '../components/News/News'

export default function AppRoutes() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/news" element={<News />}/>
            </Routes>
        </BrowserRouter>
    )
    
}