import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css';
import {Link, withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

class NavBarNormal extends Component {

    render() {

        console.log(this.props.location.pathname);
        switch (this.props.location.pathname) {
            case '/login':
                this.extComponent =
                    (<Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link to="login">Login</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>);
                break;
            case '/logout':
                this.extComponent =
                    (<Navbar.Collapse className="justify-content-end">
                        <Nav.Item>
                            <span className="navbar-text-white"> Hello, Mike. </span>
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
                                <Link to="#login" className="navbar-text-white">Logout</Link>
                            </Navbar.Text>
                        </Nav.Link>
                    </Navbar.Collapse>);
                break;
            default:
                this.extComponent = null;
        }

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
