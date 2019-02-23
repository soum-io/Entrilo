import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './index.css';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            company_name:'',
            username:'',
            password:'',
            responseToPost:''
        }
    }


    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ company_name: this.company_name, username: this.state.username, password: this.state.password}),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };


    render() {
        return (
            <div>
            <MuiThemeProvider>
            <div>
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
                type="email"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
                />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
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