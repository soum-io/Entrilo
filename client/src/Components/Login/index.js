import React, {Component} from 'react';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirector: false
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state);
        const response = await fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        });
        if(response.ok){
            const resJson = await response.json();
            this.setState({redirector:true}, this.props.onLogin(resJson))
        }else{
            this.setState({error:"Unable to successfully login"});
            setTimeout(()=>{
                this.setState({error:''})
            }, 5000);
        }
        //const body = await response.text();
        //this.setState({responseToPost: body});
    };

    render() {

        return this.state.redirector ? <Redirect to={'/search'}/> : (
            <div>
                <MuiThemeProvider >
                    <div className = "LoginBox">
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                            <Row className="justify-content-md-center">
                            <Col md="auto">
                                    <RaisedButton label="Login" primary={true} style={style}
                                onClick={(event) => this.handleSubmit(event)}/>
                            </Col>
                            </Row>

                        <br/>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                         <div>{this.state.error}</div>
                        </Col>
                        </Row>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default Login;
