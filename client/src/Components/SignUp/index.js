import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './index.css';
import NavBarNormal from "../nav/NavBarNormal.js"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            company_name:'',
            username:'',
            password:'',
            responseToPost:'',
            error:''
        }
    }


    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ company_name: this.state.company_name, username: this.state.username, password: this.state.password}),
        });
        if(response.ok){
            this.props.history.push('/login');
        }
        else{
            this.setState({error:"Unable to successfully login"});
            setTimeout(()=>{
                this.setState({error:''})
            }, 5000);
        }
    };


    render() {
        return (
            <div>
            <MuiThemeProvider>
            <div className = "SignUpBox">
                <TextField
                hintText="Enter Company"
                floatingLabelText="Company"
                onChange = {(event,newValue) => this.setState({company_name:newValue})}
                />
                <br/>
                <TextField
                hintText="Enter Username"
                floatingLabelText="Username"
                onChange = {(event,newValue) => this.setState({username:newValue})}
                />
                <br/>
                <TextField
                hintText="Enter your Password"
                type="password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
                />
                <br/>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                    <RaisedButton label="Sign Up" primary={true} style={style}
                onClick={(event) => this.handleSubmit(event)}/>
                </Col>
                </Row>
             <br/>
                <div>{this.state.error}</div>
        </div>
        </MuiThemeProvider>
        </div>
    );
    }
}
const style = {
    margin: 15,
};
export default SignUp;
