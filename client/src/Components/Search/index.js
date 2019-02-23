import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import Router from '../Router'
import NavBarLogout from "../nav/NavBarLogout.js"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class Search extends Component {


  render() {
    return (
        <div>
        < NavBarLogout />
        <Form>
          <Form.Group controlId="tripName">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control type="input" placeholder="" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
       </div>
    );
  }
}
export default Search;
