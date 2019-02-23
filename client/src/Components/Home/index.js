import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import './index.css';
import { Button } from "react-bootstrap";



class Home extends Component {


  render() {
    return (
        <Fragment>
            <Link to='/login'><Button>Login</Button></Link>
            <Link to='/signUp'><Button>SignUp</Button></Link>
       </Fragment>
    );
  }
}
export default Home;
