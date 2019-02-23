import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './NavBar.css';

class NavBarLogout extends Component {
    render(){
        return (
            <Navbar bg="dark">
              <Navbar.Brand >
                  <img
                    src="airplane.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                  <span className = "navbar-text-white" > Entrilo </span>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
              <Nav.Item >
                  <span className = "navbar-text-white" > Hello, Mike. </span>
              </Nav.Item>
              <Nav.Link>
                  <img
                    src="settings.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
              </Nav.Link>
              <Nav.Link>
                  <Navbar.Text>
                    <a href="#login" className = "navbar-text-white">Logout</a>
                  </Navbar.Text>
              </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBarLogout;
