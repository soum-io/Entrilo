import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import Router from '../Router'
import NavBarNormal from "../nav/NavBarNormal.js"



class Home extends Component {


  render() {
    return (
        <div>
        < NavBarNormal />
        <button><Link to='/Login'>Login</Link></button>
        <button><Link to='/SignUp'>SignUp</Link></button>
          <Router/>
       </div>
    );
  }
}
export default Home;
