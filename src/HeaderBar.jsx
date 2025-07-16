import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import './styles/App.css'

const HeaderBar = () => {
    return (
     <>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-12 text-center">
          <a href="/" style={{textDecoration: 'None'}}> <h4 className="display-6 ribbon">Project Portfolio</h4></a>
          </div>
        </div>
      </header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img className="img img-fluid p-1" src="/robot.png" alt="Logo" width = "50" height = "50" />
          <Navbar.Brand href="/" >&#123;Sumy Ganas&#125;</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="underline" className="me-auto" defaultActiveKey="/">
              <Nav.Link href="/tradingbot" >Trading Bot Project</Nav.Link>
              
              <Nav.Link href="/aiassistant" >AI Shopping Assistant Project</Nav.Link>
              <Nav.Link href="https://www.linkedin.com/in/sumy-ganas-201a89308/" target="_blank" rel="noopener noreferrer">LinkedIn</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     </>  
    );
  }
  
export default HeaderBar;