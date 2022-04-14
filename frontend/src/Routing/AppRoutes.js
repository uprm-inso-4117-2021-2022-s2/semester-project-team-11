import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import Register from '../components/Register/Register'
import Resources from '../components/Resources/Resources'

export default function AppRoutes() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/register" element={<Register condition={false} />} />
                <Route path="/resources" element={<Resources />}/>
                <Route path="/login" element={<Register condition={false} />} />
            </Routes>
        </BrowserRouter>
    )
}
