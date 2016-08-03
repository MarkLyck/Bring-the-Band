import React from 'react'
import {Link} from 'react-router'

import store from '../store'

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
      <nav>
        <Link to="login">Login</Link>
        <Link to="signup">Signup</Link>
      </nav>
    )

    if (this.state.authtoken || localStorage.authtoken) {
      navLinks = (
        <nav>
          <a href="#">Logout</a>
        </nav>
      )
    }

    return (
      <header>
        <Link to="/" id="logo">BringTheBand</Link>
        {navLinks}
      </header>
    )
  }
})

export default Header
