import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css';
import {Link, withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

class NavBarNormal extends Component {

    render() {
        this.extComponent = this.props.loggedIn() ?  (<Navbar.Collapse className="justify-content-end">
            <Nav.Item>
                <span className="navbar-text-white"> Hello, Mike. </span>
            </Nav.Item>
            <Nav.Item>
                <Link to={'/update'}>
                <img
                    src="settings.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Navbar.Text>
                    <Link to={'/logout'} className="navbar-text-white">Logout</Link>
                </Navbar.Text>
            </Nav.Item>
        </Navbar.Collapse>) : (<Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <Link className='navbar-text-white' to="/login">Login</Link>
            </Navbar.Text>
        </Navbar.Collapse>);

        return (
            <Navbar bg="dark">
                <Link to={"/"}>
                    <Navbar.Brand className="navbar-text-white">
                        <img
                            src="airplane.png"
                            width="20"
                            height="20"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        Entrilo
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle/>
                {this.extComponent}
            </Navbar>
        )
    }
}

export default withRouter(NavBarNormal);
