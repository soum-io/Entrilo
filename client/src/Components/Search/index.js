import React, {Component} from 'react';
import './index.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link, withRouter} from "react-router-dom";


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            peopleInputs: [],
            venueInputs: []
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
        this.deleteVenue = this.deleteVenue.bind(this);
        this.onChangeFirst = this.onChangeFirst.bind(this);
        this.onChangeLast = this.onChangeLast.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAC = this.onChangeAC.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangeVenueLocation = this.onChangeVenueLocation.bind(this);
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
            <div className = "searchDiv">
                <Form>
                    <Form.Group controlId="tripName">
                        <Form.Label>Trip Name</Form.Label>
                        <Form.Control type="input" placeholder=""/>
                    </Form.Group>


                    <Form.Group controlId="PeopleComing">
                        <Button variant="primary"  className="btn btn-default btn-custom" onClick={() => this.appendPeople()}>Add Person</Button>
                        <div id="peopleAdder">
                            {this.state.peopleInputs.map((input, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Form.Group controlId={`person${index}_name`}>
                                        <Form.Control placeholder="Full Name" onChange={this.onChangeFirst(index)} value={input.first}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={`person${index}_address`}>
                                        <Form.Control placeholder="Address Location" onChange={this.onChangeAddress(index)} value={input.address}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1.5}>
                                        <Form.Label id="classLabel"> Travel Class: </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={`person${index}_ac`}>
                                        <Form.Control as='select' onChange={this.onChangeAC(index)} value={input.ac} >
                                            {/*<Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                                                {/*Default Airplane Class*/}
                                            {/*</Dropdown.Toggle>*/}

                                            {/*<Dropdown.Menu>*/}
                                                {/*<Dropdown.Item >Economy</Dropdown.Item>*/}
                                                {/*<Dropdown.Item >Premium</Dropdown.Item>*/}
                                                {/*<Dropdown.Item >First</Dropdown.Item>*/}
                                            {/*</Dropdown.Menu>*/}
                                            <option>Economy</option>
                                            <option>Business</option>
                                        </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1}>
                                        <Button onClick={this.deletePerson(index)} variant={'outline-danger'}>X</Button>
                                    </Col>
                                </Row>)}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="DefaultVenues">
                        <Button variant="primary"  className="btn btn-default btn-custom" onClick={() => this.appendVenue()}>Add Venue</Button>
                        <div id="venueAdder">
                            {this.state.venueInputs.map((input, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Form.Group controlId={`venue${index}_name`}>
                                        <Form.Control placeholder="Venue Name" onChange={this.onChangeVenue(index)} value={input.venue}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={`venue${index}_location`}>
                                        <Form.Control placeholder="Address Location" onChange={this.onChangeVenueLocation(index)} value={input.location}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1}>
                                        <Button onClick={this.deleteVenue(index)} variant={'outline-danger'}>X</Button>
                                    </Col>
                                </Row>)}
                        </div>
                    </Form.Group>

                    <Row>
                        <Col md="auto">
                            <Form.Group controlId="startDate">
                                <Form.Label>Trip Start Date</Form.Label>
                                <div>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChangeStart}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md="auto">
                            <Form.Group controlId="endDate">
                                <Form.Label>Trip End Date</Form.Label>
                                <div>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.handleChangeEnd}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Button variant="outline-primary" type="submit">
                        <Link to="results">Results</Link>
                    </Button>
                </Form>
            </div>
        );
    }

    appendPeople() {
        let newInput = {first:'',last:'', address:'',ac:'Economy'};
        this.setState(prevState => ({peopleInputs: prevState.peopleInputs.concat([newInput])}));
    }

    appendVenue() {
        let newInput = {venue:'', location:''};
        this.setState(prevState => ({venueInputs: prevState.venueInputs.concat([newInput])}));
    }

    onChangeFirst(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let person = prevState.peopleInputs[index];
                person.first = e.target.value;
                prevState.peopleInputs[index] = person;
                return ({peopleInputs: prevState.peopleInputs})
            })
        }
    }

    onChangeLast(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let person = prevState.peopleInputs[index];
                person.last = e.target.value;
                prevState.peopleInputs[index] = person;
                return ({peopleInputs: prevState.peopleInputs})
            })
        }
    }

    onChangeAddress(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let person = prevState.peopleInputs[index];
                person.address = e.target.value;
                prevState.peopleInputs[index] = person;
                return ({peopleInputs: prevState.peopleInputs})
            })
        }
    }

    onChangeAC(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let person = prevState.peopleInputs[index];
                person.ac = e.target.value;
                prevState.peopleInputs[index] = person;
                return ({peopleInputs: prevState.peopleInputs})
            })
        }
    }

    onChangeVenue(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let venue = prevState.venueInputs[index];
                venue.venue = e.target.value;
                prevState.venueInputs[index] = venue;
                return ({venueInputs: prevState.venueInputs})
            })
        }
    }

    onChangeVenueLocation(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let venue = prevState.venueInputs[index];
                venue.location = e.target.value;
                prevState.venueInputs[index] = venue;
                return ({venueInputs: prevState.venueInputs})
            })
        }
    }

    // functionality not working
    deletePerson(index) {
        return (() => {
            //console.log(index);
            this.setState(prevState => {
                    prevState.peopleInputs.splice(index, 1);
                    return ({peopleInputs: prevState.peopleInputs})
                }
            )
        })
    }

    // not working
    deleteVenue(index) {
        return (() => {
            this.setState(prevState => {
                    prevState.venueInputs.splice(index, 1);
                    return ({venueInputs: prevState.venueInputs})
                }
            )
        })
    }
}


export default Search;
