import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom'
import logo from '../../images/StockLogo.svg';

export default function NavbarComponent({ nav }) {
  const history = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userid')
    localStorage.removeItem('fname')
    localStorage.removeItem('lname')
    history('/login')
  }
  
  const NavComponent = ({nav}) => {
    return(
      <Nav className='dashboard-nav'>
        <div>
          {nav.dashboard && <Button variant='tertiary' size='sm' onClick={() => history('/dashboard')}>Dashboard</Button>}
          {nav.stocks && <Button variant='tertiary' size='sm' onClick={() => history('/stocks')}>Stocks</Button>}
          {nav.news && <Button variant='tertiary' size='sm' onClick={() => history('/news')}>News</Button>}
          {nav.resources && <Button variant='tertiary' size='sm' onClick={() => history('/resources')}>Resources</Button>}
        </div>
        <div>
          {nav.dashboardRight && <Button variant='primary' onClick={() => history('/dashboard')}>Dashboard</Button>}
          {nav.logout && <Button variant='primary' onClick={ handleLogout }>Logout</Button>}
          {nav.login && <Button variant='primary' onClick={() => history('/login')}> Login </Button>}
          {nav.register && <Button variant='primary'onClick={() => history('/register')}> Register </Button>}
        </div>
      </Nav>
    )
  }

  return (
    <Navbar className="color-nav" >
        <Container>
            <Navbar.Brand href="/">
            <img alt="" src={logo} width="120" height="50" className="d-inline-block align-top" />
            {' '}
            </Navbar.Brand>
            <div>
            </div>
            { nav ? <NavComponent nav={nav}/> : null }
        </Container>
    </Navbar>
  )
}
