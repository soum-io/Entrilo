import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import Router from '../Router'
import NavBarLogout from "../nav/NavBarLogout.js"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Search extends Component {

    constructor(props) {
      super(props);
      this.state = {
        startDate: new Date(),
        endDate: new Date(),
        peopleInputs: ['person0'],
        venueInputs: ['venue0']
      };
      this.handleChangeStart = this.handleChangeStart.bind(this);
      this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChangeStart(date) {
      this.setState({
        startDate: date
      });
    }

      handleChangeEnd(date) {
        this.setState({
          endDate: date
        });
      }

  render() {
    return (
        <div>
        < NavBarLogout />
        <Form>
          <Form.Group controlId="tripName">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control type="input" placeholder="" />
          </Form.Group>


          <Form.Group controlId="PeopleComing">
          <div><Form.Label>Add People</Form.Label></div>
          <Button variant="primary" onClick={ () => this.appendPeople() }>Add Person</Button>
          <div id="peoplerAdder">
               {this.state.peopleInputs.map(input =>
                  <Row key = {input}>
                    <Col>
                      <Form.Control placeholder="First name" />
                    </Col>
                    <Col>
                      <Form.Control placeholder="Last name" />
                    </Col>
                    <Col>
                      <Form.Control placeholder="Address Location" />
                    </Col>
                    <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Default Airplan Class
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#">Economy</Dropdown.Item>
                          <Dropdown.Item href="#">Premium</Dropdown.Item>
                          <Dropdown.Item href="#">First</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
              </Row> )}
          </div>
          </Form.Group>

          <Form.Group controlId="DefaultVenues">
          <div><Form.Label>Add Desired Venues</Form.Label></div>
          <Button variant="primary" onClick={ () => this.appendVenue() }>Add Venue</Button>
          <div id="venueAdder">
               {this.state.venueInputs.map(input =>
                  <Row key = {input}>
                    <Col>
                      <Form.Control placeholder="Venue Name" />
                    </Col>
                    <Col>
                      <Form.Control placeholder="Address Location" />
                    </Col>
              </Row> )}
          </div>
          </Form.Group>


          <Form.Group controlId="startDate">
              <Form.Label>Trip Start Date</Form.Label>
              <div>
                  <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStart}
                    />
              </div>
            </Form.Group>

            <Form.Group controlId="endDate">
                <Form.Label>Trip End Date</Form.Label>
                <div>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleChangeEnd}
                      />
                 </div>
              </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
       </div>
    );
  }

  appendPeople() {
    var newInput = `person${this.state.peopleInputs.length}`;
    this.setState(prevState => ({ peopleInputs: prevState.peopleInputs.concat([newInput]) }));
  }

  appendVenue() {
    var newInput = `venue${this.state.venueInputs.length}`;
    this.setState(prevState => ({ venueInputs: prevState.venueInputs.concat([newInput]) }));
  }
}


export default Search;
