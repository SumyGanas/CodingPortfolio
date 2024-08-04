import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import robot from './static_files/robot.png';
import React from 'react'

const HeaderBar = () => {
    return (
     <>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-12 text-center">
          <a href="/home" style={{textDecoration: 'None', color: 'black'}}> <h4 className="display-6">Sumy Ganas</h4></a>
          </div>
        </div>
      </header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img className="img img-fluid p-1" src={robot} alt="Logo" width = "50" height = "50" />
          <Navbar.Brand href="/home">&#123;Sumy Ganas&#125;</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/tradingbot">Trading Bot Project</Nav.Link>
              <Nav.Link href="/aiassistant">AI Shopping Assistant Project</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  FOSS Contributions
                </NavDropdown.Item>
                <NavDropdown.Item href="https://www.linkedin.com/in/sumy-ganas-201a89308/"rel="noreferrer" target="_blank">
                  LinkedIn
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Github Profile
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     </>  
    );
  }
  
export default HeaderBar;