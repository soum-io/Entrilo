import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import Home from './Components/Home';
import * as serviceWorker from './serviceWorker';
import NavBarNormal from "./Components/nav/NavBarNormal";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Search from "./Components/Search";
import Results from "./Components/Results";
import Container from "react-bootstrap/es/Container";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.currentUser = null
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(user) {
        this.setState({currentUser: user});
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <NavBarNormal/>
                    <Container>
                        <Route exact path={'/'} component={Home}/>
                        <Route path={'/login'} render={props => {
                            return this.currentUser ? (
                                <Redirect to={'/'}/>
                            ) : (
                                <Login onLogin={this.loginUser}/>
                            )
                        }}/>
                        <Route path='/signUp' component={SignUp}/>
                        <Route path='/search' component={Search}/>
                        <Route path='/results' component={Results}/>
                    </Container>
                </Fragment>
            </BrowserRouter>)
    }
}

ReactDOM.render((<App/>), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
