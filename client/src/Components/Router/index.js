import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login'
import SignUp from '../SignUp'
import Home from '../Home'
import Search from '../Search'

const Router = () => (
    <Switch>
     <Route exact path='/Login' component={Login}/>
     <Route path='/SignUp' component={SignUp}/>
     <Route path='/Search' component={Search}/>
    </Switch>

)


export default Router
