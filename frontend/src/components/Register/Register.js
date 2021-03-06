import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillKeyFill } from "react-icons/bs";
import { IoTelescopeOutline } from "react-icons/io5"
import { hosts } from '../../config/hosts';
import { useNavigate } from 'react-router-dom'
import NavbarComponent from "../Navbar/Navbar.js";

export default function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [legalAge, setLegalAge] = useState(false);

    const history = useNavigate();

    // TODO: Add verification of fields and modal when error occurs to display error, i.e. invalid password/email, etc.
    const registerUser = () => {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "firstname": firstname, "lastname": lastname, "email": email, "password": password, "legalAge": legalAge })
        };
        fetch(hosts['heroku'] + 'stocker/users', request)
            .then((response) => response.json())
            .then((data) => {

                if (data.userid) {
                    localStorage.setItem("userid", data.userid);
                    localStorage.setItem("fname", firstname);
                    localStorage.setItem("lname", lastname);
                    history('/dashboard');
                } else {
                    console.log(data);
                    localStorage.clear();
                }
            })
            .catch(e => {
                console.log("Error");
                localStorage.clear();
                console.log(e)
            });
    }

    const renderRegister = () => {

       return (
            <Form className='register-form'>
                <Form.Group className="mb-3">
                    <Form.Label>first name</Form.Label>
                    <InputGroup >
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name=" firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="enter your first name" />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>last name</Form.Label>
                    <InputGroup >
                        <InputGroup.Text><BsFillPersonFill /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="enter your last name" />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>email</Form.Label>
                    <InputGroup >
                        <InputGroup.Text><BsFillEnvelopeFill /></InputGroup.Text>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter your email" />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>password</Form.Label>
                    <InputGroup >
                        <InputGroup.Text><BsFillKeyFill /></InputGroup.Text>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="enter your password" />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check this box if you are 18 years or older." checked={legalAge} onChange={(e) => setLegalAge(e.target.checked)} />
                </Form.Group>

                <div className='btn-container'>
                    <Button variant='primary' onClick={registerUser}> Register </Button>
                </div>
            </Form >)
        

    }

    const renderMessage = () => {
        return(
            <div className='login-register-toggler'>
                <h1>
                    Already in Stocker? <IoTelescopeOutline className='toggler-icon'/>
                </h1>
                <div className='btn-container'>
                    <Button variant='tertiary' href='/login'> Login </Button>
                </div>

            </div>  
        )
        
    }

    return (
        <>
            <NavbarComponent />
            <div className='login-register-container'>
                { renderMessage() }
                <div className='division-line'></div>
                { renderRegister() }
            </div>
        </>
    )
}
