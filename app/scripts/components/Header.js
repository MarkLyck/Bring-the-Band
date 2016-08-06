import $ from 'jquery'
import _ from 'underscore'
import React from 'react'
import {Link, hashHistory} from 'react-router'

import store from '../store'
import SearchBar from './SearchBar'

import Signup from './Signup'
import Login from './Login'

import Modal from './Modal'
import TicketModal from './TicketModal'

const Header = React.createClass({
  getInitialState: function() {
    return {authtoken: store.session.get('authtoken'), showModal: store.session.get('showModal')}
  },
  componentDidMount: function() {
    store.session.on('change', this.updateHeader)
  },
  updateHeader: function() {
    this.setState({authtoken: store.session.get('authtoken'), showModal: store.session.get('showModal')})
  },
  gotoTopBands: function() {
    hashHistory.push('/top-bands')
  },
  showSignup: function() {
    store.session.set('showModal', 'signup')
  },
  showLogin: function() {
    store.session.set('showModal', 'login')
  },
  closeModal: function(e) {
    console.log('close modal');
    if (e) {
      if (_.toArray(e.target.classList).indexOf('form-modal-container') !== -1) {
        store.session.set('showModal', false)
      }
    }
  },
  getTickets: function() {
    console.log('GET TICKETS');
    store.session.set('showModal', 'tickets')
  },
  render: function() {
    let navLinks = (
      <div id="nav-links">
        <Link to="/top-bands"><i className="fa fa-star" aria-hidden="true"></i> Top Bands</Link>
        <a onClick={this.showLogin}><i className="fa fa-sign-in" aria-hidden="true"></i> Login</a>
        <a onClick={this.showSignup}><i className="fa fa-user-plus" aria-hidden="true"></i> Signup</a>
      </div>
    )
    if (localStorage.authtoken) {
      navLinks = (
        <div id="nav-links">
          <Link to="/top-bands"><i className="fa fa-star" aria-hidden="true"></i> Top Bands</Link>
          <a href="#" id="logout-btn" onClick={store.session.logout.bind(store.session)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
        </div>
      )
    }

    let modal;
    if (this.state.showModal === 'signup') {
      modal = <div className="form-modal-container" onClick={this.closeModal}><Signup closeModal={this.closeModal}/></div>
    } else if (this.state.showModal === 'login') {
      modal = <div className="form-modal-container" onClick={this.closeModal}><Login closeModal={this.closeModal}/></div>
    } else if (this.state.showModal === 'tickets') {
      modal = <Modal onClick={this.closeModal}><TicketModal closeModal={this.closeModal}/></Modal>
    }

    let buttons = (
      <div className="wrapper">
        <button onClick={this.gotoTopBands}>See the top Bands!</button>
        <button onClick={this.showSignup}>Sign up now!</button>
      </div>
    )
    if (localStorage.authtoken) {
      buttons = (
        <div className="wrapper">
          <button onClick={this.getTickets}>Get your tickets now!</button>
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
          <div className="content">
            <h1 id="main-title">Bring the Band!</h1>
            <h2 id="subtitle">Vote for your favorite bands to attend the festival!</h2>
            {buttons}
          </div>
        </div>
        {modal}
      </header>
    )
  }
})

export default Header
