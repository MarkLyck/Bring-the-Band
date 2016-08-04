import React from 'react'
import {Link} from 'react-router'

import store from '../store'
import SearchBar from './SearchBar'

const Header = React.createClass({
  getInitialState: function() {
    return {authtoken: store.session.get('authtoken')}
  },
  componentDidMount: function() {
    store.session.on('change', this.updateHeader)
  },
  updateHeader: function() {
    this.setState({authtoken: store.session.get('authtoken')})
  },
  render: function() {
    let navLinks = (
      <div id="nav-links">
        <Link to="/top-bands">Top Bands</Link>
        <Link to="login">Login</Link>
        <Link to="signup">Signup</Link>
      </div>
    )

    if (this.state.authtoken || localStorage.authtoken) {
      navLinks = (
        <div id="nav-links">
          <Link to="/top-bands">Top Bands</Link>
          <a href="#" onClick={store.session.logout.bind(store.session)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
        </div>
      )
    }

    return (
      <header>
        <nav>
        <SearchBar/>
        <img id="logo" src="assets/images/logo.svg" />
        {navLinks}
        </nav>
        <div id="hero">
          <h1 id="main-title">Bring the Band!</h1>
          <h2 id="subtitle">Vote for your favorite bands to attend the festival!</h2>
          <div className="wrapper">
            <button>See the top Bands!</button>
            <button>Sign up now!</button>
          </div>
        </div>
      </header>
    )
  }
})

export default Header
