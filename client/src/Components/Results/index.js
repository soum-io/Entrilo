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

            defaultCostOpen: [false, false],
            defaultCostNames: ["Show General Cost Breakdown", "Show General Cost Breakdown"],
            defaultAirport: ["Denver", "Denver"],
            defaultHotel: ["Shea Hotel", "Shea Hotel"],
            defaultLocation: ["201 S. Ashland Ave. La Grange IL, 60525", "New York City"],
            defaultAirportlink: ["#", "#"],
            defaultHotellink: ["#", "#"],
            defaultLocationLink: ["#", "#"],
            defaultTotalCost: ["$12,500", "$12,500"],
            defaultFlightsCost: ["$8,000", "$8,000"],
            defaultVenueCost: ["$2,000", "$2,000"],
            defaultHotelsCost: ["$2,000", "$2,000"],
            defaultTransportationCost: ["$500", "$500"],
            defaultDepartFlights: [["A123", "B123", "C123"], ["A123", "B123", "C123"]],
            defaultDepartFlightsCost: [["$1", "$2", "$3"], ["$1", "$2", "$3"]],
            defaultReturnFlights: [["_A123", "_B123", "_C123"], ["_A123", "_B123", "_C123"]],
            defaultReturnFlightsCost: [["$4", "$5", "$6"], ["$4", "$5", "$6"]],
            defaultCostDetailOpen: [false, false],
            defaultCostDetailNames: ["Show Detailed Cost Breakdown", "Show Detailed Cost Breakdown"],
            loading:true,

			all_results_loaded:true,
			isYelpLoaded: [false, false],
			items:[{},{}]
        }
    }

	handleChange = e => {
		  const {name, value} = e.target;

		  this.setState(() => ({
			[name]: value
		  }))
		}

    componentDidMount() {
        //fetch Data here
        if (this.state.loading) {
            this.turnOffLoading = setTimeout(() => {
                this.setState(() => ({loading: false}))
            }, 500);
        }

		if(this.state.all_results_loaded){
			this.state.defaultCostOpen.map((_, index) => {
				fetch("/yelp?location="+this.state.defaultLocation[index],{method: 'GET'})
				.then(res=> res.json()).then(json => {
						// this.state.items[index] = json;
						// this.forceUpdate();
						// this.state.isYelpLoaded[index] = true;
						// this.forceUpdate();



						this.setState({
						  isYelpLoaded: update(this.state.isYelpLoaded, {[index] : {$set: true}}),
						  items: update(this.state.items, {[index] : {$set: json}})
						})
						console.log(this.state.isYelpLoaded)
						console.log(this.state.items)



						// var isYelpLoaded = this.state.isYelpLoaded;
						// isYelpLoaded[index] = true;
						//
						// var items = this.state.items;
						// items[index] = json;
						// this.setState({items: items, isYelpLoaded: isYelpLoaded});

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
                    {this.state.defaultCostOpen.map((input, index) =>
						<Row>
						<Col>
	                        <Form.Group className="singleResult">
									<table>
		                            <tr>
		                                <th>
		                                Provided Location:
		                                </th>
		                                <td>
		                                <a href="#">{this.state.defaultLocation[index]}</a>
		                                </td>
		                            </tr>
		                            <tr>
		                                <th >
		                                    Destination Airport:
		                                </th>
		                                <td>
		                                    <a href="#" > {this.state.defaultAirport[index]} </a>
		                                </td>
		                            </tr>
		                            <tr>
		                                <th>
		                                Hotel Name:
		                                </th>
		                                <td>
		                                <a href="#">{this.state.defaultHotel[index]}</a>
		                                </td>
		                            </tr>
		                            <tr>
		                                <th>
		                                Total Cost:
		                                </th>
		                                <td>
		                                {this.state.defaultTotalCost[index]}
		                                </td>
		                            </tr>
									</table>
		                            <table>
									<Row>
		                            <Col md="auto">
		                            <Button  size="xs" className="btn btn-default show-cost" onClick={() => this.collapseDefaultDetailCost(index)}> {this.state.defaultCostDetailNames[index]} </Button>
									<Button  size="xs" className="btn btn-default show-cost" onClick={() => this.collapseDefaultCost(index)}> {this.state.defaultCostNames[index]} </Button>
		                            <Collapse in={this.state.defaultCostDetailOpen[index]}>
		                                <Form.Group  controlId="peopleOnTrip">
		                                    <table>
		                                    <tr>
		                                        <th>
		                                        Name
		                                        </th>
		                                        <th>
		                                        Depart Flight
		                                        </th>
		                                        <th>
		                                        Depart Flight Cost
		                                        </th>
		                                        <th>
		                                        Return Flight
		                                        </th>
		                                        <th>
		                                        Return Flight Cost
		                                        </th>
		                                    </tr>
		                                    {this.state.defaultDepartFlights[index].map((_, inner_idx) =>
		                                            <tr>
		                                                <td>
		                                                    {this.state.peopleNames[inner_idx]}
		                                                </td>
		                                                <td>
		                                                    {this.state.defaultDepartFlights[index][inner_idx]}
		                                                </td>
		                                                <td>
		                                                    {this.state.defaultDepartFlightsCost[index][inner_idx]}
		                                                </td>
		                                                <td>
		                                                    {this.state.defaultReturnFlights[index][inner_idx]}
		                                                </td>
		                                                <td>
		                                                    {this.state.defaultReturnFlightsCost[index][inner_idx]}
		                                                </td>
		                                            </tr>
		                                    )}
		                                    </table>
		                                </Form.Group>
		                            </Collapse>
		                            <Collapse in={this.state.defaultCostOpen[index]}>
			                            <Form.Group  controlId="peopleOnTrip">
			                            <table>
			                                    <tr>
			                                        <th>
			                                        Flights:
			                                        </th>
			                                        <td>
			                                        {this.state.defaultFlightsCost[index]}
			                                        </td>
			                                    </tr>
			                                    <tr>
			                                        <th>
			                                        Venue:
			                                        </th>
			                                        <td>
			                                        {this.state.defaultVenueCost[index]}
			                                        </td>
			                                    </tr>
			                                    <tr>
			                                        <th>
			                                        Hotels:
			                                        </th>
			                                        <td>
			                                        {this.state.defaultHotelsCost[index]}
			                                        </td>
			                                    </tr>
			                                    <tr>
			                                        <th>
			                                        Transportation:
			                                        </th>
			                                        <td>
			                                        {this.state.defaultTransportationCost[index]}
			                                        </td>
			                                    </tr>
			                            </table>
			                            </Form.Group>
		                            </Collapse>
		                            </Col>
									</Row>
		                            </table>
	                        </Form.Group>
						</Col>

						<Col md = "auto">
							<Form.Group className="singleResult">
								<Row className="justify-content-md-center">
									<Col md="auto">
										Top Yelp Results For Hotels Near Here
									</Col>
								</Row>
								<table>
								<Collapse in={this.state.isYelpLoaded[index]}>
										{this.showYelp(index)}
								</Collapse>
								</table>
							</Form.Group>
						</Col>
						</Row>
                    )}
                </Form>
                </div>
            </div>
        );
    }

	showYelp(index){
		if(!this.state.isYelpLoaded[index]){
			return;
		} else {
			 return (
				 <span>
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
				 {this.state.items[index]["businesses"].map((_, yelpIdx) =>
					 <tr>
						 <td>
						 	{this.state.items[index]["businesses"][yelpIdx]["name"]}
						 </td>
						 <td>
						 	{this.state.items[index]["businesses"][yelpIdx]["location"]["address1"]}
						 </td>
						 <td>
							{this.state.items[index]["businesses"][yelpIdx]["price"]}
						 </td>
					 </tr>
			 	 )}
				 </span>
			 );
		}
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

    collapseDefaultCost(index){
        var cur = this.state.defaultCostOpen[index];
        if(cur){
            this.state.defaultCostOpen[index] = false;
            this.forceUpdate()
            this.state.defaultCostNames[index] = "Show General Cost Breakdown"
            this.forceUpdate()
        } else {
			this.state.defaultCostDetailOpen[index] = false;
            this.forceUpdate()
            this.state.defaultCostOpen[index] = true;
            this.forceUpdate()
            this.state.defaultCostNames[index] = "Hide General Cost Breakdown"
            this.forceUpdate()
        }
    }

    collapseDefaultDetailCost(index){
        var cur = this.state.defaultCostDetailOpen[index];
        if(cur){
            this.state.defaultCostDetailOpen[index] = false;
            this.forceUpdate()
            this.state.defaultCostDetailNames[index] = "Show Detailed Cost Breakdown"
            this.forceUpdate()
        } else {
			this.state.defaultCostOpen[index] = false;
            this.forceUpdate()
            this.state.defaultCostDetailOpen[index] = true;
            this.forceUpdate()
            this.state.defaultCostDetailNames[index] = "Hide Detailed Cost Breakdown"
            this.forceUpdate()
        }
    }
}


export default Results;
