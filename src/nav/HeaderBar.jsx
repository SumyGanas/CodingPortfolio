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
              <NavDropdown title="Open Source" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.0" className="no-active" href="https://github.com/SumyGanas/tables-plus" target="_blank" rel="noopener noreferrer">Obsidian Plugin</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Github Links" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1" className="no-active" href="https://github.com/SumyGanas/CodingPortfolio" target="_blank" rel="noopener noreferrer">Current web app</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.2" className="no-active" href="https://github.com/SumyGanas/Go-term-cookbook" target="_blank" rel="noopener noreferrer">Golang project</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.3" className="no-active" href="https://github.com/SumyGanas/tables-plus" target="_blank" rel="noopener noreferrer">Typescript Project</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Coursera Certificates" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.4" className="no-active" href="https://www.coursera.org/account/accomplishments/records/DDRQ7ELKYM5T" target="_blank" rel="noopener noreferrer">Django Web Framework</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.5" className="no-active" href="https://www.coursera.org/account/accomplishments/records/F7G7RHDW7TWZ" target="_blank" rel="noopener noreferrer">Databases for Backend Development</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>

      </Navbar>
     </>  
    );
  }
  
export default HeaderBar;