import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login'
import SignUp from '../SignUp'
import Home from '../Home'

const Router = () => (
    <Switch>
     <Route exact path='/Login' component={Login}/>
     <Route path='/SignUp' component={SignUp}/>
    </Switch>

)


export default Router
