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

            defaultCostOpen: [false],
            defaultCostNames: ["Show General Cost Breakdown"],
            defaultAirport: ["Denver"],
            defaultHotel: ["Shea Hotel"],
            defaultLocation: ["Shea Venue"],
            defaultAirportlink: ["#"],
            defaultHotellink: ["#"],
            defaultLocationLink: ["#"],
            defaultTotalCost: ["$12,500"],
            defaultFlightsCost: ["$8,000"],
            defaultVenueCost: ["$2,000"],
            defaultHotelsCost: ["$2,000"],
            defaultTransportationCost: ["$500"],
            defaultDepartFlights: [["A123", "B123", "C123"]],
            defaultDepartFlightsCost: [["$1", "$2", "$3"]],
            defaultReturnFlights: [["_A123", "_B123", "_C123"]],
            defaultReturnFlightsCost: [["$4", "$5", "$6"]],
            defaultCostDetailOpen: [false],
            defaultCostDetailNames: ["Show Detailed Cost Breakdown"],
            loading:true

        }
    }

    componentDidMount() {
        //fetch Data here
        if (this.state.loading) {
            this.turnOffLoading = setTimeout(() => {
                this.setState(() => ({loading: false}))
            }, 500);
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
                        <Form.Group className="singleResult">
							<table>
                            <tr>
                                <th>
                                Location Name:
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
                            <Col md="auto">
                            <Button  className="btn btn-default show-cost" onClick={() => this.collapseDefaultDetailCost(index)}> {this.state.defaultCostDetailNames[index]} </Button>
							<Button  className="btn btn-default show-cost" onClick={() => this.collapseDefaultCost(index)}> {this.state.defaultCostNames[index]} </Button>
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
                            </table>
                        </Form.Group>
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
