import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './NavBar.css';
import {Link, withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

class NavBarNormal extends Component {

    render() {
        this.extComponent = this.props.loggedIn() ?  (<Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="sidePadding">
                <span className="navbar-text-white">{`Hello, ${this.props.currentUser.company_name}`}</span>
            </Navbar.Text>
            <Navbar.Text className="sidePadding">
                <Link to={'/account'}>
                <img
                    src="settings.png"
                    width="20"
                    height="20"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                </Link>
            </Navbar.Text>
            <Navbar.Text className="sidePadding">
                <Navbar.Text>
                    <Link to={'/logout'} className="navbar-text-white">Logout</Link>
                </Navbar.Text>
            </Navbar.Text>
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
