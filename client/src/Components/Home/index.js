import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import './index.css';
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Home extends Component {

    constructor (props) {
        super(props);
        this.state = {
          animationClass: 'gradient'
        }
      }


  render() {
    return (
        <div id={this.state.animationClass} >
            <Row className="justify-content-md-center">
                <Col md="auto">
                <img
                    src="logo.png"
                    height="90"
                    className="d-inline-block align-top logoMargins "
                    alt="React Bootstrap logo"
                />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2>
                    Easily Find the Cheapest Options for Scheduling Enterprise Trips
                    </h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md="auto" className = "buttonMargins">
                <Link to='/login'><Button variant="outline-primary" size="lg">Login</Button></Link>
                </Col>
                <Col  md="auto"  className = "buttonMargins">
                <Link to='/signUp'><Button variant="outline-primary" size="lg">SignUp</Button></Link>
                </Col>
            </Row>
       </div>
    );
  }
}
export default Home;
