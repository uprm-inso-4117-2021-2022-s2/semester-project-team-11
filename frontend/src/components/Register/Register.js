import React, { useState } from 'react'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import './Register.css'

export default function Register() {
    const [isRegistered, setIsRegistered] = useState(true)

    return isRegistered ? < Login toggle={ setIsRegistered } /> : <SignUp toggle={ setIsRegistered } />
}
