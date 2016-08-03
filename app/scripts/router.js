import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import App from './components/App'
import Login from './components/Login'
import Signup from './components/Signup'

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>

      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
    </Route>
  </Router>
)

//<IndexRoute component={}/>

export default router
