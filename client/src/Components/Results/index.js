import React, {Component} from 'react';
import './index.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { css } from '@emotion/core';
import { GridLoader } from 'react-spinners';
import Collapse from 'react-bootstrap/Collapse'
import {Link, withRouter} from "react-router-dom";
import update from 'react-addons-update';


const override = css`
	    display: block;
	    position: fixed;
	    top: 40%;
	    left: 50%;
	    margin-top: -50px;
	    margin-left: -100px;
	`;



class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
			// peopleNames: ["Michael Shea", "Jake Bonk", "Kanika"],
			// defaultLocation: ["201 S. Ashland Ave. La Grange IL, 60525", "New York City"],
			// defaultAirport: ["Denver"],
			// defaultTotalCost: ["$12,500"],

			peopleNames: [],
			defaultLocation: [],
			defaultAirport: [],
			defaultTotalCost: [],

			showFlights:[],
			showHotels:[],
			showVenues:[],
			venueData:[],
			hotelData:[],
			isYelpLoaded: [], // for venues
			isYelpLoaded2: [], // for hotel

			ButtonNames: "Show Names of People Attending",
			loading:true,
			all_results_loaded:true,
			namesOpen: false,
			allYelpLoaded:false,
        }
    }

    componentDidMount() {
		// fetch Data here
		// if (this.state.loading) {
		// 	this.turnOffLoading = setTimeout(() => {
		// 		this.setState(() => ({loading: false}))
		// 	}, 500);
		// }

		var input_data = this.props.location.state.results;
		console.log(input_data);

		var peopleInputs = input_data["peopleInputs"];
		var venueInputs = input_data["venueInputs"];
		var x = 0;

		for(x = 0; x < peopleInputs.length; x++){
			this.state.peopleNames.push(peopleInputs[x]["name"]);
			this.forceUpdate();
		}

		for(x = 0; x < venueInputs.length; x++){
			this.state.defaultLocation.push(venueInputs[x]["location"]);
			this.forceUpdate();
			this.state.defaultAirport.push(venueInputs[x]["iata"])
			this.forceUpdate();
			this.state.defaultTotalCost.push(venueInputs[x]["cost"]);
			this.forceUpdate();;
		}


		var len_report = this.state.defaultLocation.length;
		console.log("len_report")
		var i;
		for(i = 0; i < len_report; i++){
			this.state.showFlights.push(false);
			this.forceUpdate();
			this.state.showHotels.push(false);
			this.forceUpdate();
			this.state.showVenues.push(false);
			this.forceUpdate();
			this.state.venueData.push([["","",""],["","",""],["","",""]]);
			this.forceUpdate();
			this.state.hotelData.push([["","",""],["","",""],["","",""]]);
			this.forceUpdate();
			this.state.isYelpLoaded.push(false);
			this.forceUpdate();
			this.state.isYelpLoaded2.push(false);
			this.forceUpdate();

		}


		if(this.state.all_results_loaded){
			this.state.defaultLocation.map((_, index) => {
				fetch("/yelp?location="+this.state.defaultLocation[index],{method: 'GET'})
				.then(res=> res.json()).then(json => {
						this.state.isYelpLoaded[index] = true;
						this.forceUpdate();
						this.state.venueData[index].map((__, yelpIdx) => {
							this.state.venueData[index][yelpIdx][0] = json["businesses"][yelpIdx]["name"];
							this.forceUpdate();
							this.state.venueData[index][yelpIdx][1] = json["businesses"][yelpIdx]["location"]["address1"];
							this.forceUpdate();
							this.state.venueData[index][yelpIdx][2] = json["businesses"][yelpIdx]["price"];
							this.forceUpdate();
						})
					});
			})
		}

		if(this.state.all_results_loaded){
			this.state.defaultLocation.map((_, index) => {
				fetch("/yelp2?location="+this.state.defaultLocation[index],{method: 'GET'})
				.then(res=> res.json()).then(json => {
						this.state.isYelpLoaded2[index] = true;
						this.forceUpdate();
						this.state.hotelData[index].map((__, yelpIdx) => {
							this.state.hotelData[index][yelpIdx][0] = json["businesses"][yelpIdx]["name"];
							this.forceUpdate();
							this.state.hotelData[index][yelpIdx][1] = json["businesses"][yelpIdx]["location"]["address1"];
							this.forceUpdate();
							this.state.hotelData[index][yelpIdx][2] = json["businesses"][yelpIdx]["price"];
							this.forceUpdate();
						})
					});
			})
		}

		this.state.loading = false;

    }

    render() {
        if (this.state.loading) {
            return (<div className='sweet-loading'>
                <GridLoader
            sizeUnit={"px"}
            size={40}
            css={override}
            color={'#123abc'}
            loading={this.state.loading}
            />
            </div> )
        }

        return (
            <div>
                <h2> Results <Button className="btn btn-default btn-margin" variant="outline-primary"> <Link to="search">Search Again</Link> </Button> </h2>

                <div>
                    <Row>
                        <Col>
                            <Form.Label>
                            <Button className="btn btn-default btn-height" onClick={() => this.collapseNames()}> {this.state.ButtonNames} </Button>
                            </Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{offset: 1}}>
                            <Collapse in={this.state.namesOpen}>
                                <Form.Group  controlId="peopleOnTrip">
                                        <ListGroup>
                                            {this.state.peopleNames.map((name, index) =>
                                              <div>
                                                <Row>
                                                    <Col sm={4}>
                                                        <ListGroup.Item>{name}</ListGroup.Item>
                                                    </Col>
                                                </Row>
                                              </div>
                                            )}
                                        </ListGroup>
                                </Form.Group>
                            </Collapse>
                        </Col>
                    </Row>
                </div>


                <div id="defaultResults">
                <Form>
                    {this.state.defaultLocation.map((input, index) =>
						<Row className="justify-content-md-center">
							<Col className = "borderMe" md="auto">
								<Row>
									 {this.state.defaultTotalCost[index] + " " } - { " " + this.state.defaultLocation[index] }
								</Row>
								<Row className="justify-content-md-center">
									<Button variant = "outline-primary" className = "btn-margin" onClick={() => this.showFlights(index)}> Show Flight Info </Button>
									<Button variant = "outline-primary" className = "btn-margin" onClick={() => this.showVenues(index)}> Show Venue Info </Button>
									<Button variant = "outline-primary" className = "btn-margin" onClick={() => this.showHotels(index)}> Show Hotel Info </Button>
								</Row>

								 <Collapse in={this.state.showFlights[index]}>
									<Row className="justify-content-md-center">
				                        <Form.Group className="singleResult">
												<Row className="justify-content-md-center">
													<Col md="auto">
														Cheapest Flight Information From Amadeus
													</Col>
												</Row>
												<table>
					                            <tr>
					                                <th>
					                                Meeting Location:
					                                </th>
					                                <td>
					                             		{this.state.defaultLocation[index]}
					                                </td>
					                            </tr>
					                            <tr>
					                                <th >
					                                    Destination Airport:
					                                </th>
					                                <td>
					                                    {this.state.defaultAirport[index]}
					                                </td>
					                            </tr>
					                            <tr>
					                                <th>
					                                Total Roundtrip Flight Cost:
					                                </th>
					                                <td>
					                                {this.state.defaultTotalCost[index]}
					                                </td>
					                            </tr>
												</table>
				                        </Form.Group>
									</Row>
								</Collapse>

								<Collapse in={this.state.showVenues[index]}>
									<Row className="justify-content-md-center">
										<Form.Group className="singleResult">
											<Row className="justify-content-md-center">
												<Col md="auto">
													Top Yelp Results For Venues Near Here
												</Col>
											</Row>
											<table>
												<tr>
							   					 <th>
							   						 Venue Name
							   					 </th>
							   					 <th>
							   						 Address
							   					 </th>
							   					 <th>
							   						 Yelp Price
							   					 </th>
							   				 </tr>
							   				 {this.state.venueData[index].map((_, yelpIdx) =>
							   					 <tr>
							   						 <td>
							   						 	{this.state.venueData[index][yelpIdx][0]}
							   						 </td>
							   						 <td>
							   						 	{this.state.venueData[index][yelpIdx][1]}
							   						 </td>
							   						 <td>
							   							{this.state.venueData[index][yelpIdx][2]}
							   						 </td>
							   					 </tr>
											 )}
											</table>
										</Form.Group>
									</Row>
								</Collapse>

								<Collapse in={this.state.showHotels[index]}>
									<Row className="justify-content-md-center">
										<Form.Group className="singleResult">
											<Row className="justify-content-md-center">
												<Col md="auto">
													Top Yelp Results For Hotels Near Here
												</Col>
											</Row>
											<table>
												<tr>
							   					 <th>
							   						 Hotel Name
							   					 </th>
							   					 <th>
							   						 Address
							   					 </th>
							   					 <th>
							   						 Yelp Price
							   					 </th>
							   				 </tr>
							   				 {this.state.venueData[index].map((_, yelpIdx) =>
							   					 <tr>
							   						 <td>
							   						 	{this.state.hotelData[index][yelpIdx][0]}
							   						 </td>
							   						 <td>
							   						 	{this.state.hotelData[index][yelpIdx][1]}
							   						 </td>
							   						 <td>
							   							{this.state.hotelData[index][yelpIdx][2]}
							   						 </td>
							   					 </tr>
											 )}
											</table>
										</Form.Group>
									</Row>
								</Collapse>
							</Col>
						</Row>
                    )}
                </Form>
                </div>
            </div>
        );
    }


    collapseNames(){
        var cur = this.state.namesOpen;
        if(cur){
            this.state.namesOpen = false;
            this.forceUpdate()
            this.state.ButtonNames= "Show Names of People Attending"
            this.forceUpdate()
        } else {
            this.state.namesOpen = true;
            this.forceUpdate()
            this.state.ButtonNames= "Collapse Names"
            this.forceUpdate()
        }
    }

	showFlights(index){
		if(this.state.showFlights[index]){
			this.state.showFlights[index] = false;
			this.forceUpdate()
		} else {
			this.state.showVenues[index] = false;
			this.forceUpdate()
			this.state.showHotels[index] = false;
			this.forceUpdate()
			this.state.showFlights[index] = true;
			this.forceUpdate()
		}
	}

	showHotels(index){
		if(this.state.showHotels[index]){
			this.state.showHotels[index] = false;
			this.forceUpdate()
		} else {
			this.state.showVenues[index] = false;
			this.forceUpdate()
			this.state.showFlights[index] = false;
			this.forceUpdate()
			this.state.showHotels[index] = true;
			this.forceUpdate()
		}
	}

	showVenues(index){
		if(this.state.showVenues[index]){
			this.state.showVenues[index] = false;
			this.forceUpdate()
		} else {
			this.state.showFlights[index] = false;
			this.forceUpdate()
			this.state.showHotels[index] = false;
			this.forceUpdate()
			this.state.showVenues[index] = true;
			this.forceUpdate()
		}
	}

}


export default Results;
