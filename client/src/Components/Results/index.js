import React, {Component} from 'react';
import './index.css';
import { css } from '@emotion/core';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import Collapse from 'react-bootstrap/Collapse'
import { GridLoader } from 'react-spinners';

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
            peopleNames: ["Michael Shea", "Jake Bonk", "Ma Boi Jake"],
            namesOpen: false,
            ButtonNames: "Show Names",

            defaultCostOpen: [false],
            defaultCostNames: ["Show Cost Breakdown"],
            defaultAirport: ["Denver"],
            defaultHotel: ["Shea Hotel"],
            defaultVenue: ["Shea Venue"],
            defaultAirportlink: ["#"],
            defaultHotellink: ["#"],
            defaultVenuelink: ["#"],
            defaultTotalCost: ["$12,500"],
            defaultFlightsCost: ["$8,000"],
            defaultVenueCost: ["$2,000"],
            defaultHotelsCost: ["$2,000"],
            defaultTransportationCost: ["$500"],

            calculatedCostOpen: [false],
            calculatedCostNames: ["Show Cost Breakdown"],
            calculatedAirport: ["O'hare"],
            calculatedHotel: ["Bonk Hotel"],
            calculatedVenue: ["Bonk Venue"],
            calculatedAirportlink: ["#"],
            calculatedHotellink: ["#"],
            calculatedVenuelink: ["#"],
            calculatedTotalCost: ["$16,500"],
            calculatedFlightsCost: ["$9,000"],
            calculatedVenueCost: ["$3,000"],
            calculatedHotelsCost: ["$3,000"],
            calculatedTransportationCost: ["$1,500"],

            loading: true

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
                <Button className="btn btn-default btn-margin" variant="outline-primary"> <Link to="search">Search Again</Link> </Button>

                <div>
                    <Row>
                        <Col>
                            <Form.Label>
                            People <Button className="btn btn-default btn-height" onClick={() => this.collapseNames()}> {this.state.ButtonNames} </Button>
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
                                                        <ListGroup.Item as="li">{name}</ListGroup.Item>
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
                <Form.Label controlId="DefaultResultsLabel">
                Results for Default Venue Locations:
                </Form.Label>
                    {this.state.defaultCostOpen.map((input, index) =>
                        <Form.Group className="singleResult">
                            <Row>
                                <Col>
                                    Destination Airport:
                                </Col>
                                <Col>
                                    <a href="#" > {this.state.defaultAirport[index]} </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Hotel Name:
                                </Col>
                                <Col>
                                <a href="#">{this.state.defaultHotel[index]}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Venue Name
                                </Col>
                                <Col>
                                <a href="#">{this.state.defaultVenue[index]}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Total Cost:
                                </Col>
                                <Col>
                                {this.state.defaultTotalCost[index]} <Button  className="btn btn-default btn-height" onClick={() => this.collapseDefaultCost(index)}> {this.state.defaultCostNames[index]} </Button>
                                <Collapse in={this.state.defaultCostOpen[index]}>
                                    <Form.Group  controlId="peopleOnTrip">
                                        <Row>
                                            <Col>
                                            Flights:
                                            </Col>
                                            <Col>
                                            {this.state.defaultFlightsCost[index]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Venue:
                                            </Col>
                                            <Col>
                                            {this.state.defaultVenueCost[index]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Hotels:
                                            </Col>
                                            <Col>
                                            {this.state.defaultHotelsCost[index]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Transportation:
                                            </Col>
                                            <Col>
                                            {this.state.defaultTransportationCost[index]}
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Collapse>
                                </Col>
                            </Row>
                        </Form.Group>
                    )}
                </Form>
                </div>

                <div id="calculatedResults">
                <Form>
                <Form.Label controlId="CalculatedResultsLabel">
                Calculated Cheapest Results:
                </Form.Label>
                    {this.state.calculatedCostOpen.map((input, index) =>
                        <Form.Group className="singleResult">
                            <Row>
                                <Col>
                                    Destination Airport:
                                </Col>
                                <Col>
                                    <a href="#" > {this.state.calculatedAirport[index]} </a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Hotel Name:
                                </Col>
                                <Col>
                                <a href="#">{this.state.calculatedHotel[index]}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Venue Name
                                </Col>
                                <Col>
                                <a href="#">{this.state.calculatedVenue[index]}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                Total Cost:
                                </Col>
                                <Col>
                                {this.state.calculatedTotalCost[index]} <Button  className="btn btn-default btn-height" onClick={() => this.collapseCalculatedCost(index)}> {this.state.calculatedCostNames[index]} </Button>
                                <Collapse in={this.state.calculatedCostOpen[index]}>
                                    <Form.Group  controlId="peopleOnTrip">
                                        <Row>
                                            <Col>
                                            Flights:
                                            </Col>
                                            <Col>
                                            {this.state.calculatedFlightsCost[index]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Venue:
                                            </Col>
                                            <Col>
                                            {this.state.calculatedVenueCost[index]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Hotels:
                                            </Col>
                                            <Col>
                                            {this.state.calculatedHotelsCost[index]}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Transportation:
                                            </Col>
                                            <Col>
                                            {this.state.calculatedTransportationCost[index]}
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Collapse>
                                </Col>
                            </Row>
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
            this.state.ButtonNames= "Show Names"
            this.forceUpdate()
        } else {
            this.state.namesOpen = true;
            this.forceUpdate()
            this.state.ButtonNames= "Collapse Names"
            this.forceUpdate()
        }
    }

    collapseCalculatedCost(index){
        var cur = this.state.calculatedCostOpen[index];
        if(cur){
            this.state.calculatedCostOpen[index] = false;
            this.forceUpdate()
            this.state.calculatedCostNames[index] = "Show Cost Breakdown"
            this.forceUpdate()
        } else {
            this.state.calculatedCostOpen[index] = true;
            this.forceUpdate()
            this.state.calculatedCostNames[index] = "Hide Cost Breakdown"
            this.forceUpdate()
        }
    }

    collapseDefaultCost(index){
        var cur = this.state.defaultCostOpen[index];
        if(cur){
            this.state.defaultCostOpen[index] = false;
            this.forceUpdate()
            this.state.defaultCostNames[index] = "Show Cost Breakdown"
            this.forceUpdate()
        } else {
            this.state.defaultCostOpen[index] = true;
            this.forceUpdate()
            this.state.defaultCostNames[index] = "Hide Cost Breakdown"
            this.forceUpdate()
        }
    }
}


export default Results;
