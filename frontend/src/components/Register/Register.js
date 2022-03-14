import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillKeyFill } from "react-icons/bs";
import { hosts } from '../../config/hosts';
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [legalAge, setLegalAge] = useState(false);

    const [inLogin, setInLogin] = useState(true)

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
        fetch(hosts['localhost'] + 'stocker/users', request)
            .then((response) => response.json())
            .then((data) => {

                if (data.userid) {
                    localStorage.setItem("userid", data.userid);
                    history('/');
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

                <div className='register-form-button-container'>
                    <Button variant="dark" >
                        Login
                    </Button>
                </div>
            </Form>
        )

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

                <div className='register-form-button-container'>
                    <Button variant="dark" onClick={registerUser}>
                        Register
                    </Button>
                </div>
            </Form >)
        

    }

    const renderToggler = () => {
        return(
            <div className='login-register-toggler'>
                <h1>
                    { inLogin ? 'Want to join Stocker?' : 'Already in Stocker?'}
                    <img className='toggler-icon' src={ inLogin ? 'Rocket.png' : 'Binoculars.png'} alt='Logo'/>


                </h1>
                <div className='register-form-button-container'>
                    <Button variant="dark" onClick={ () => setInLogin(!inLogin) }> { inLogin ? 'Register' : 'Login' } </Button>
                </div>

            </div>  
        )
        
    }

    return (
        <div>
            <div className='register-form-container'>
                <div className='container'>
                    { inLogin ? renderLogin() : renderToggler() }
                    <div className='division-line'></div>
                    { !inLogin ? renderRegister() : renderToggler() }
                </div>
            </div>
        </div>
    )
}
