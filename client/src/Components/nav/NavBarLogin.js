import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'

class NavBarLogin extends Component {
    render(){
        return (
            <Navbar>
              <Navbar.Brand >
                  <img
                    src="airplane.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                  Entrilo
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <a href="#login">Login</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBarLogin;
