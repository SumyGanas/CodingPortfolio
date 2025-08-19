import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import '../styles/App.css'

const HeaderBar = () => {
    return (
     <>
      <Navbar expand="lg" className="bg-body-tertiary py-1">

          <img className="img img-fluid p-1" src="/robot.png" alt="Logo" width = "50" height = "50" />
          <Navbar.Brand href="/" >&#123;Sumy Ganas&#125;</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="underline" className="me-auto" defaultActiveKey="/">
              <Nav.Link href="/tradingbot" >Trading Bot Project</Nav.Link>
              
              <Nav.Link href="/aiassistant" >AI Shopping Assistant Project</Nav.Link>
              <Nav.Link href="https://www.linkedin.com/in/sumy-ganas-201a89308/" target="_blank" rel="noopener noreferrer">LinkedIn</Nav.Link>
              <NavDropdown title="Github Links" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1" href="https://github.com/SumyGanas/CodingPortfolio" target="_blank" rel="noopener noreferrer">Current web app</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.2" href="https://github.com/SumyGanas/Go-term-cookbook" target="_blank" rel="noopener noreferrer">Golang project</NavDropdown.Item>
            </NavDropdown>           
            </Nav>
          </Navbar.Collapse>

      </Navbar>
     </>  
    );
  }
  
export default HeaderBar;