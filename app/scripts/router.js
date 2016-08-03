import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import App from './components/App'
import Login from './components/Login'
import Signup from './components/Signup'
import SearchPage from './components/SearchPage'
import VotePage from './components/VotePage'

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SearchPage}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>

      <Route path="search" component={SearchPage}>
        <Route path=":searchTerm" component={SearchPage}/>
      </Route>

      <Route path="vote" component={VotePage}>
        <Route path=":bandId" component={VotePage}/>
      </Route>

    </Route>
  </Router>
)

//<IndexRoute component={}/>

export default router
