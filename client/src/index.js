import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './Components/Home';
import * as serviceWorker from './serviceWorker';
import NavBarNormal from "./Components/nav/NavBarNormal";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Search from "./Components/Search";
import Container from "react-bootstrap/es/Container";

class App extends React.Component{
    constructor(props){
        super(props);
        this.currentUser = null
    }

    render(){
        return (
        <BrowserRouter>
            <Container>
                <NavBarNormal/>
                <Route exact path={'/'} component={Home} />
                <Route path={'/login'} component={Login}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/search' component={Search}/>
            </Container>
        </BrowserRouter>)
    }
}

ReactDOM.render((<App />), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
