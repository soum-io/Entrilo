import React, {Component} from 'react';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from "prop-types";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state);
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
        });
        if(response.ok){
            const resJson = await response.json();
            this.props.onLogin(resJson);

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
        return (
            <div>
                <MuiThemeProvider>
                    <div>
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
                        <RaisedButton label="Submit" primary={true} style={style}
                                      onClick={(event) => this.handleSubmit(event)}/>
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

Login.propTypes = {
    onLogin: PropTypes.func.isRequired
};

export default Login;
