import React, { useState } from 'react'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import './Register.css'

export default function Register({condition}) {
    
    const [isRegistered, setIsRegistered] = useState(condition)

    return isRegistered ? < Login toggle={ setIsRegistered } /> : <SignUp toggle={ setIsRegistered } />
}
