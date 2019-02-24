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
import Account from "./Components/Search";
import Results from "./Components/Results";
import Container from "react-bootstrap/es/Container";

const defaultUser = {
    company_name:'',
    _id:''
};

class App extends React.Component {
    constructor(props) {
        super(props);
        let user = window.sessionStorage.getItem('user');
        this.state = {currentUser: user ? JSON.parse(user) : defaultUser};
        this.loginUser = this.loginUser.bind(this);
        console.log(this.state.currentUser);
    }

    loggedIn = () => {
        return this.state.currentUser.company_name && this.state.currentUser._id
    };

    loginUser(user) {
        this.setState({currentUser: user},
            () => {window.sessionStorage.setItem('user', JSON.stringify(user))});
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <NavBarNormal loggedIn={this.loggedIn} {...this.state}/>
                    <Container>
                        <Route exact path={'/'} render={props => {
                            return this.loggedIn() ? (
                                <Redirect to={'/search'}/>
                            ) : (
                                <Home {...props}/>
                            )
                        }}/>
                        <Route path={'/login'} render={props => {
                            return this.loggedIn() ? (
                                <Redirect to={'/search'}/>
                            ) : (
                                <Login {...props} onLogin={this.loginUser}/>
                            )
                        }}/>
                        <Route path='/signUp' component={SignUp}/>
                        <Route path='/search' component={Search}/>
                        <Route path='/logout' render={props => {
                            this.setState({currentUser:defaultUser}, () =>
                                window.sessionStorage.removeItem('user'));
                            return <Redirect to='/'/>
                        }}/>
                        <Route path='/results' component={Results}/>
                        <Route path='/account' component={Account}/>
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
