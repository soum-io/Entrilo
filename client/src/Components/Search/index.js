import React, {Component} from 'react';
import './index.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Autocomplete from 'react-autocomplete'
//What did the duck say to bar owner?

//Put it on my bill
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
            filterVenue:[],
            filterPeople:[],
            venueOptions:[],
            venueInputs: [],
            peopleOptions:[]
        };
        fetch('/api/account',{method: 'GET',
            credentials: 'include',})
            .then(response => response.json())
            .then(resJson => {
                console.log(resJson["employee"]);
                this.setState({peopleOptions : resJson["employee"],venueOptions : resJson["venue"]});
            }).catch(e => this.props.history.push('/login'));
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
        this.deleteVenue = this.deleteVenue.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
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
                                            <Autocomplete
                                                inputProps={{ className:'Demo__search-input form-control'}}
                                                getItemValue={(item) => item.name}
                                                items={this.state.filterPeople}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                        {item.name}
                                                    </div>
                                                }
                                                placeholder="Full Name"
                                                onChange={this.onChangeName(index)}
                                                value={input.name}
                                                onSelect={(val,item) => {
                                                    this.state.peopleInputs[index].name = item.name;
                                                    this.forceUpdate();
                                                    this.state.peopleInputs[index].location = item.location;
                                                    this.forceUpdate();
                                                    this.state.peopleInputs[index].longitude = item.longitude;
                                                    this.forceUpdate();
                                                    this.state.peopleInputs[index].latitude = item.latitude;
                                                    this.forceUpdate();
                                                    this.state.peopleInputs[index].airline_class = item.airline_class;
                                                    this.forceUpdate();
                                                    console.log(item);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={`person${index}_address`}>
                                        <Form.Control placeholder="Address Location" onChange={this.onChangeAddress(index)} value={input.location}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1.5}>
                                        <Form.Label id="classLabel"> Travel Class: </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={`person${index}_ac`}>
                                        <Form.Control as='select' onChange={this.onChangeAC(index)} value={input.airline_class} >
                                            {/*<Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                                                {/*Default Airplane Class*/}
                                            {/*</Dropdown.Toggle>*/}

                                            {/*<Dropdown.Menu>*/}
                                                {/*<Dropdown.Item >Economy</Dropdown.Item>*/}
                                                {/*<Dropdown.Item >Premium</Dropdown.Item>*/}
                                                {/*<Dropdown.Item >First</Dropdown.Item>*/}
                                            {/*</Dropdown.Menu>*/}
                                            <option value="0">Economy</option>
                                            <option value="1">Business</option>
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
                                            <Autocomplete
                                                inputProps={{ className:'Demo__search-input form-control'}}
                                                getItemValue={(item) => item.name}
                                                items={this.state.filterVenue}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                        {item.name}
                                                    </div>
                                                }
                                                placeholder="Venue Name"
                                                onChange={this.onChangeVenue(index)}
                                                value={input.name}
                                                onSelect={(val,item) => {
                                                    this.state.venueInputs[index].name = item.name;
                                                    this.forceUpdate();
                                                    this.state.venueInputs[index].location = item.location;
                                                    this.forceUpdate();
                                                    this.state.venueInputs[index].longitude = item.longitude;
                                                    this.forceUpdate();
                                                    this.state.venueInputs[index].latitude = item.latitude;
                                                    this.forceUpdate();
                                                }}
                                            />
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
        let newInput = {name:'', address:'',airline_class:0};
        this.setState(prevState => ({peopleInputs: prevState.peopleInputs.concat([newInput])}));
    }

    appendVenue() {
        let newInput = {venue:'', location:''};
        this.setState(prevState => ({venueInputs: prevState.venueInputs.concat([newInput])}));
    }

    onChangeName(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let person = prevState.peopleInputs[index];
                person.name = e.target.value;
                prevState.peopleInputs[index] = person;
                this.state.filterPeople = [];
                for(var i = 0; i < this.state.peopleOptions.length && this.state.filterPeople.length < 3; i++){
                    if(this.state.peopleOptions[i].name.toLowerCase().indexOf(e.target.value.toLowerCase()) == 0){
                        this.state.filterPeople.push(this.state.peopleOptions[i]);
                    }
                }
                return ({peopleInputs: prevState.peopleInputs})
            })
        }
    }

    onChangeAddress(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let person = prevState.peopleInputs[index];
                person.location = e.target.value;
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
                person.airline_class = e.target.value;
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
                venue.name = e.target.value;
                prevState.venueInputs[index] = venue;
                this.state.filterVenue = [];
                for(var i = 0; i < this.state.venueOptions.length && this.state.filterVenue.length < 3; i++){
                    if(this.state.venueOptions[i].name.toLowerCase().indexOf(e.target.value.toLowerCase()) == 0){
                        this.state.filterVenue.push(this.state.venueOptions[i]);
                    }
                }
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
