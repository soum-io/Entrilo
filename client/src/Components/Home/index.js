import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import Router from '../Router'

class Home extends Component {


  render() {
    return (
        <div>
        <button><Link to='/Login'>Login</Link></button>
        <button><Link to='/SignUp'>SignUp</Link></button>
          <Router/>
       </div>



    );
  }
}
export default Home;