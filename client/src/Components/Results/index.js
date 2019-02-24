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
            peopleNames: ["Michael Shea", "Jake Bonk", "Kanika"],
            namesOpen: false,
            ButtonNames: "Show Names of People Attending",

            defaultAirport: ["Denver", "Denver"],
            defaultLocation: ["201 S. Ashland Ave. La Grange IL, 60525", "New York City"],
            defaultTotalCost: ["$12,500", "$12,500"],
            loading:true,
			venueData:[[["","",""],["","",""],["","",""]],[["","",""],["","",""],["","",""]]],
			hotelData:[[["","",""],["","",""],["","",""]],[["","",""],["","",""],["","",""]]],
			all_results_loaded:true,
			isYelpLoaded: [false, false], // for venues
			isYelpLoaded2: [false, false], // for hotels

			allYelpLoaded:false
        }
    }

    componentDidMount() {
		// fetch Data here
		if (this.state.loading) {
			this.turnOffLoading = setTimeout(() => {
				this.setState(() => ({loading: false}))
			}, 500);
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

}


export default Results;
