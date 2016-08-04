import $ from 'jquery'
import _ from 'underscore'
import React from 'react'
import {Link, hashHistory} from 'react-router'

import store from '../store'
import SearchBar from './SearchBar'

import Signup from './Signup'
import Login from './Login'

const Header = React.createClass({
  getInitialState: function() {
    return {authtoken: store.session.get('authtoken'), showModal: false}
  },
  componentDidMount: function() {
    store.session.on('change', this.updateHeader)
  },
  updateHeader: function() {
    this.setState({authtoken: store.session.get('authtoken')})
  },
  gotoTopBands: function() {
    hashHistory.push('/top-bands')
  },
  showSignup: function() {
    this.setState({showModal: 'signup'})
  },
  showLogin: function() {
    this.setState({showModal: 'login'})
  },
  closeModal: function(e) {
    console.log('close modal');
    console.log($(e.target));
    if (_.toArray(e.target.classList).indexOf('form-modal-container') !== -1) {
      this.setState({showModal: false})
    }
  },
  render: function() {
    let navLinks = (
      <div id="nav-links">
        <Link to="/top-bands">Top Bands</Link>
        <a onClick={this.showLogin}>Login</a>
        <a onClick={this.showSignup}>Signup</a>
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

    let modal;
    if (this.state.showModal === 'signup') {
      modal = <div className="form-modal-container" onClick={this.closeModal}><Signup/></div>
    } else if (this.state.showModal === 'login') {
      modal = <div className="form-modal-container" onClick={this.closeModal}><Login/></div>
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
            <button onClick={this.gotoTopBands}>See the top Bands!</button>
            <button onClick={this.showSignup}>Sign up now!</button>
          </div>
        </div>
        {modal}
      </header>
    )
  }
})

export default Header
