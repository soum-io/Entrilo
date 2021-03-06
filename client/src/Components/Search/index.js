import React, {Component} from 'react';
import './index.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Autocomplete from 'react-autocomplete'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
//What did the duck say to bar owner?

//Put it on my bill
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link, Redirect, withRouter} from "react-router-dom";


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            result:{},
            redirector:false,
            endDate: new Date(),
            peopleInputs: [],
            filterVenue:[],
            filterPeople:[],
            venueOptions:[],
            venueInputs: [],
            peopleOptions:[],
            error: ''
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

    handleSubmit = async e => {
        e.preventDefault();
        if (this.state.peopleInputs.length==0 || this.state.venueInputs.length==0){
            return this.printErrorMessage();
        }
        var url_string = '/api/search';
        // url_string+=('?startDate=' + this.state.startDate);
        // url_string+=('?endDate=' + this.state.endDate);
        // url_string+=('?peopleInputs=' + this.state.peopleInputs);
        // url_string+=('?venueInputs=' + this.state.venueInputs);



        var mikey = await fetch('/api/search', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({startDate: this.state.startDate, endDate: this.state.endDate, peopleInputs: this.state.peopleInputs, venueInputs: this.state.venueInputs}),
        });
        if(mikey.ok){
            var resp = await mikey.json();
            console.log(resp);
            this.props.history.push({pathname:'/results', state:{results:resp}});
        }

        // this.props.history.push({pathname:'/results'});

        //this.setState({results:response,redirector:true});

        // const response = await fetch(url_string, {
        //     method: 'GET',
        //     credentials: 'include',
        // });

        // if(response.ok){
        //     const resJson = await response.json();
        //     var result = resJson.parse();
        //     var cities = [];
        //     var i;
        //     for (i = 0; i < result.length; i++) {
        //         let city = {};
        //         city.loc =
        //     }
        //     }
        //     for
        //     this.setState({redirector:true})
        // }else{
        //     this.setState({error:"Unable to successfully search"});
        //     setTimeout(()=>{
        //         this.setState({error:''})
        //     }, 5000);
        // }

        //this.setState({redirector:true});
    };


    printErrorMessage = () => {
        if(this.state.peopleInputs.length==0){
            this.setState({error: "Please include at least one Employee"});
            return;
        }
        if(this.state.venueInputs.length==0){
            this.setState({error: "Please include a preferred location"});
        }

    };

    render() {
        return this.state.redirector ? <Redirect to={{pathname: '/results'}} /> : (
            <div className = "searchDiv">
                <Form>
                 <h2> Search for Your Next Enterprise Trip! </h2>
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
                                                inputProps={{placeholder:"Full Name", className:'Demo__search-input form-control'}}
                                                getItemValue={(item) => item.name}
                                                items={this.state.filterPeople}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                        {item.name}
                                                    </div>
                                                }
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
                                        </Form.Group>
                                    </Col>
                                    <Col md="auto" >
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
                        <Button variant="primary"  className="btn btn-default btn-custom" onClick={() => this.appendVenue()}>Add Location</Button>
                        <div id="venueAdder">
                            {this.state.venueInputs.map((input, index) =>
                                <Row key={index}>
                                    <Col>
                                        <Form.Group controlId={`venue${index}_name`} >
                                            <Autocomplete
                                                inputProps={{placeholder:"Location Name", className:'Demo__search-input form-control'}}
                                                getItemValue={(item) => item.name}
                                                items={this.state.filterVenue}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                        {item.name}
                                                    </div>
                                                }
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


                    <Button variant="outline-primary" type="Results" onClick={(event) => this.handleSubmit(event)}>
                    Results
                    </Button>
                     <div>{this.state.error}</div>

                </Form>
            </div>
        );
    }

    appendPeople() {
        let newInput = {name:'',longitude:"",latitude: "",location:'',airline_class:0};
        this.setState(prevState => ({peopleInputs: prevState.peopleInputs.concat([newInput])}));
    }

    appendVenue() {
        let newInput = {venue:'', location:'',longitude:"",latitude: ""};
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
