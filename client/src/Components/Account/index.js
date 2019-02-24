import React, {Component} from 'react';
import './index.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import "react-datepicker/dist/react-datepicker.css";


class Account extends Component {

    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };

    updatePeople = (index) => {
        if(this.state.peopleInputs[index].name.length > 0){
            if(this.state.peopleInputs[index]._id != undefined){
                //Update Person
                this.setState(prevState => {
                        fetch('/api/employee/'+prevState.peopleInputs[index]._id,{method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',body:JSON.stringify({airline_class:prevState.peopleInputs[index].airline_class,name:prevState.peopleInputs[index].name,longitude:prevState.peopleInputs[index].longitude,latitude:prevState.peopleInputs[index].latitude,location:prevState.peopleInputs[index].location})});
                        return ({peopleInputs: prevState.peopleInputs});
                    }
                )
            }else{
                //Try to create Person
                if(this.state.peopleInputs[index].longitude != null && this.state.peopleInputs[index].latitude != null && this.state.peopleInputs[index].airline_class == 0 || this.state.peopleInputs[index].airline_class == 1){
                    this.setState(async prevState => {
                            fetch('/api/employee',{method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',body:JSON.stringify({airline_class:prevState.peopleInputs[index].airline_class,name:prevState.peopleInputs[index].name,longitude:prevState.peopleInputs[index].longitude,latitude:prevState.peopleInputs[index].latitude,location:prevState.peopleInputs[index].location})}).then(result=>{return result.json()}).then(jsonRes=>{
                                console.log(jsonRes);
                                this.setState({peopleInputs : jsonRes["employee"]});
                            });
                            return ({peopleInputs: prevState.peopleInputs})
                        }
                    )
                }
            }
        }
    };

    updateVenue = (index) => {
        if(this.state.venueInputs[index].name.length > 0){
            if(this.state.venueInputs[index]._id != undefined){
                //Update Venue
                this.setState(prevState => {
                        fetch('/api/venue/'+prevState.venueInputs[index]._id,{method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',body:JSON.stringify({name:prevState.venueInputs[index].name,longitude:prevState.venueInputs[index].longitude,latitude:prevState.venueInputs[index].latitude,location:prevState.venueInputs[index].location})});
                        return ({venueInputs: prevState.venueInputs})
                    }
                )
            }else{
                //Try to create venue
                if(this.state.venueInputs[index].longitude != null && this.state.venueInputs[index].latitude != null){
                    this.setState(prevState => {
                            fetch('/api/venue',{method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',body:JSON.stringify({name:prevState.venueInputs[index].name,longitude:prevState.venueInputs[index].longitude,latitude:prevState.venueInputs[index].latitude,location:prevState.venueInputs[index].location})});
                            return ({venueInputs: prevState.venueInputs})
                        }
                    )
                }
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            companyId: "",
            peopleInputs: [],
            venueInputs: [],
            errorMessage: '',
            latitude: null,
            longitude: null,
            isGeocoding: false,
        };

        fetch('/api/account',{method: 'GET',
            credentials: 'include',})
            .then(response => response.json())
            .then(resJson => {
                console.log(resJson["employee"]);
                this.setState({companyName :resJson["company_name"],companyId : resJson["_id"],peopleInputs : resJson["employee"],venueInputs : resJson["venue"]});
            }).catch(e => this.props.history.push('/login'));
        this.deletePerson = this.deletePerson.bind(this);
        this.deleteVenue = this.deleteVenue.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAC = this.onChangeAC.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.onChangeVenueLocation = this.onChangeVenueLocation.bind(this);
    }

    render() {
        const {
            address,
            errorMessage,
            latitude,
            longitude,
            isGeocoding,
        } = this.state;
        return (
            <div>
                <Form>
                    <Form.Group controlId="companyName">
                        <h1>{this.state.companyName}</h1>
                    </Form.Group>


                    <Form.Group controlId="PeopleComing">
                        <div><Form.Label>Add People</Form.Label></div>
                        <Button variant="primary" className="btn-custom" onClick={() => this.appendPeople()}>Add Person</Button>
                        <div id="peopleAdder">
                            {this.state.peopleInputs.map((input, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Form.Group controlId={`person${index}_name`}>
                                            <Form.Control placeholder="Name" onBlur={(e)=>{this.updatePeople(index);}} onChange={this.onChangeName(index)} value={input.name}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <PlacesAutocomplete
                                            onChange={value => {
                                                this.state.peopleInputs[index].location = value;
                                                this.forceUpdate();
                                                this.setState({
                                                    latitude: null,
                                                    longitude: null,
                                                    errorMessage: '',
                                                });
                                            }}
                                            value={input.location}
                                            onSelect={async (address)=>{
                                                var loc = await geocodeByAddress(address);
                                                this.state.peopleInputs[index].location = loc[0].formatted_address;
                                                this.forceUpdate();
                                                loc = loc[0].geometry.location;
                                                this.state.peopleInputs[index].latitude = loc.lat();
                                                this.forceUpdate();
                                                this.state.peopleInputs[index].longitude = loc.lng();
                                                this.forceUpdate();
                                                this.updatePeople(index);
                                            }}
                                            onError={this.handleError}
                                            shouldFetchSuggestions={input.location.length > 2}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                                return (
                                                    <div className="Demo__search-bar-container">
                                                        <div className="Demo__search-input-container">
                                                            <input
                                                                {...getInputProps({
                                                                    placeholder: 'Search Places...',
                                                                    className: 'Demo__search-input form-control',
                                                                })}
                                                            />
                                                        </div>
                                                        {suggestions.length > 0 && (
                                                            <div className="Demo__autocomplete-container" >
                                                                {suggestions.map(suggestion => {
                                                                    const className = 'Demo__suggestion-item';

                                                                    return (
                                                                        /* eslint-disable react/jsx-key */
                                                                        <div
                                                                            {...getSuggestionItemProps(suggestion, { className })}
                                                                        >
                                                                            <strong>
                                                                                {suggestion.formattedSuggestion.mainText}
                                                                            </strong>{' '}
                                                                            <small>
                                                                                {suggestion.formattedSuggestion.secondaryText}
                                                                            </small>
                                                                        </div>
                                                                    );
                                                                    /* eslint-enable react/jsx-key */
                                                                })}
                                                                <div className="Demo__dropdown-footer">
                                                                    <div>
                                                                        <img width="100"
                                                                             src={'./powered_by_google_default.png'}
                                                                             className="Demo__dropdown-footer-image"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        </PlacesAutocomplete>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={`person${index}_ac`}>
                                            <Form.Control as='select' onChange={this.onChangeAC(index)} value={input.airline_class}>
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
                        <div><Form.Label>Add Desired Venues</Form.Label></div>
                        <Button variant="primary" className="btn-custom" onClick={() => this.appendVenue()}>Add Venue</Button>
                        <div id="venueAdder">
                            {this.state.venueInputs.map((input, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Form.Group controlId={`venue${index}_name`}>
                                            <Form.Control placeholder="Venue Name" onChange={this.onChangeVenue(index)} onBlur={(e)=>{this.updateVenue(index);}} value={input.name}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <PlacesAutocomplete
                                            onChange={value => {
                                                this.state.venueInputs[index].location = value;
                                                this.forceUpdate();
                                                this.setState({
                                                    latitude: null,
                                                    longitude: null,
                                                    errorMessage: '',
                                                });
                                            }}
                                            value={input.location}
                                            onSelect={async (address)=>{
                                                var loc = await geocodeByAddress(address);
                                                this.state.venueInputs[index].location = loc[0].formatted_address;
                                                this.forceUpdate();
                                                loc = loc[0].geometry.location;
                                                this.state.venueInputs[index].latitude = loc.lat();
                                                this.forceUpdate();
                                                this.state.venueInputs[index].longitude = loc.lng();
                                                this.forceUpdate();
                                                this.updateVenue(index);
                                            }}
                                            onError={this.handleError}
                                            shouldFetchSuggestions={input.location.length > 2}
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                                                return (
                                                    <div className="Demo__search-bar-container">
                                                        <div className="Demo__search-input-container">
                                                            <input
                                                                {...getInputProps({
                                                                    placeholder: 'Search Places...',
                                                                    className: 'Demo__search-input form-control',
                                                                })}
                                                            />
                                                        </div>
                                                        {suggestions.length > 0 && (
                                                            <div className="Demo__autocomplete-container" >
                                                                {suggestions.map(suggestion => {
                                                                    const className = 'Demo__suggestion-item';

                                                                    return (
                                                                        /* eslint-disable react/jsx-key */
                                                                        <div
                                                                            {...getSuggestionItemProps(suggestion, { className })}
                                                                        >
                                                                            <strong>
                                                                                {suggestion.formattedSuggestion.mainText}
                                                                            </strong>{' '}
                                                                            <small>
                                                                                {suggestion.formattedSuggestion.secondaryText}
                                                                            </small>
                                                                        </div>
                                                                    );
                                                                    /* eslint-enable react/jsx-key */
                                                                })}
                                                                <div className="Demo__dropdown-footer">
                                                                    <div>
                                                                        <img width="100"
                                                                             src={'./powered_by_google_default.png'}
                                                                             className="Demo__dropdown-footer-image"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }}
                                        </PlacesAutocomplete>
                                    </Col>
                                    <Col xs={1}>
                                        <Button onClick={this.deleteVenue(index)} variant={'outline-danger'}>X</Button>
                                    </Col>
                                </Row>)}
                        </div>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    appendPeople() {
        let newInput = {name:'', location:'',airline_class:0};
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
                person.airline_class = e.target.selectedIndex;
                prevState.peopleInputs[index] = person;
                return ({peopleInputs: prevState.peopleInputs})
            })
            this.updatePeople(index);
        }
    }

    onChangeVenue(index){
        return (e) => {
            e.persist();
            this.setState(prevState => {
                let venue = prevState.venueInputs[index];
                venue.name = e.target.value;
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
                    fetch('/api/employee/'+prevState.peopleInputs[index]._id,{method: 'DELETE',
                        credentials: 'include',});
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
                    fetch('/api/venue/'+prevState.venueInputs[index]._id,{method: 'DELETE',
                        credentials: 'include',});
                    prevState.venueInputs.splice(index, 1);
                    return ({venueInputs: prevState.venueInputs})
                }
            )
        })
    }
}


export default Account;