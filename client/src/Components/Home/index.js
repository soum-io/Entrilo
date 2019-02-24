import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import './index.css';
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Home extends Component {


  render() {
    return (
        <div>
            <Row>
                <Col md="auto">
                <img
                    src="logo.png"
                    height="90"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>
                    Easily Find the Cheapest Options for Scheduling Enterprise Trips
                    </h2>
                </Col>
            </Row>
            <Link to='/login'><Button>Login</Button></Link>
            <Link to='/signUp'><Button>SignUp</Button></Link>
       </div>
    );
  }
}
export default Home;
