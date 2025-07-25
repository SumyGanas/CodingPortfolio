import { React, useState } from 'react';
import '../styles/App.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TermsOfUse from './Termsofuse.jsx';
import Nav from 'react-bootstrap/Nav';

const FooterBar = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const componentMap = {
        tos: <TermsOfUse />
      };
    
     return (<footer className="blog-footer">
    <Navbar className="bg-body-tertiary" sticky="bottom">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text>
          <TermsOfUse aria-modal="true"/>
          <br/> 
            <Nav.Item>
              Copyright © 2024 Sumy Ganas   
            </Nav.Item>
          <br/>
          <Nav.Item>
          <div style={{textAlign:"center", fontSize:"12px"}}><a href="https://www.flaticon.com/">Stickers created by Stickers - Flaticon</a></div>
          </Nav.Item>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </footer>)
}


export default FooterBar;