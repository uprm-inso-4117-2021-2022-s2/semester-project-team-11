import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { BsFillEnvelopeFill, BsFillKeyFill } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5"
import { hosts } from '../../../config/hosts';
import { useNavigate } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Container, Col, Row } from "react-bootstrap";
import logo from '../../../../src/images/Stocks_GrowthCombined.png';
import "./Login.css";

export default function Login( {toggle} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useNavigate();

    const userAuthentication = async () => {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "password": password})
        };

        try{
            const response = await fetch(hosts['heroku'] + 'stocker/users/login', request)
            const data = await response.json()

            if (data.userid) {
                localStorage.setItem("userid", data.userid);
                localStorage.setItem("fname", data.firstname);
                localStorage.setItem("lname", data.lastname);
                history('/');
            } else {
                console.log(data);
                localStorage.clear();
            }

        }
        catch(e){
            console.log("Error");
            localStorage.clear();
            console.log(e)
        }
    }

    const renderLogin = () => {

        return (
          

            <Form className='login-form'>
                <Form.Group className="mb-3">
                    <Form.Label>email</Form.Label>
                    <InputGroup>
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

                <div className='form-button-container'>
                    <Button variant="dark" onClick={ userAuthentication }>
                        Login
                    </Button>
                </div>
            </Form>
        )

    }

    const renderMessage = () => {
        return(
            <div className='login-register-toggler'>
                <h1>
                    Want to join Stocker? <IoRocketOutline className='toggler-icon'/>
                </h1>
                <div className='form-button-container'>
                    <Button variant="dark" onClick={ () => toggle(false)}> Register </Button>
                </div>

            </div>  
        )
        
    }
    

    return (
        <>
        <Navbar className="color-nav">
        <Container>
              <Navbar.Brand href="#home">
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
        <div className='login-register-container'>
                {renderLogin()}
                <div className='division-line'></div>
                {renderMessage()}
            </div>
            </>
    )
}
