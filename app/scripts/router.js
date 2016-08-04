import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import App from './components/App'
import Login from './components/Login'
import Signup from './components/Signup'
import SearchPage from './components/SearchPage'
import TopBandsPage from './components/VotePage'

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TopBandsPage}/>

      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>

      <Route path="search" component={SearchPage}>
        <Route path=":searchTerm" component={SearchPage}/>
      </Route>

      <Route path="/top-bands" component={TopBandsPage}/>

    </Route>
  </Router>
)

export default router
