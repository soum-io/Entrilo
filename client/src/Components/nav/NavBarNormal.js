import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'

class NavBarNormal extends Component {
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
            </Navbar>
        )
    }
}

export default NavBarNormal;
