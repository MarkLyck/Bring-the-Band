import React from 'react'
import  {hashHistory} from 'react-router'

import store from '../store'

import Modal from './Modal'


const Signup = React.createClass({
  signup: function() {
    console.log('this: ', this);
    let username = this.refs.username.value
    let password = this.refs.password.value
    store.session.signup(username, password)
  },
  render: function() {
    return (
      <Modal>
        <div className="form-modal">
        <h3>Signup</h3>
          <input type="text" placeholder="Username" ref="username"/>
          <input type="password" placeholder="Password" ref="password"/>
          <button onClick={this.signup} id="submit-btn">Signup</button>
        </div>
      </Modal>
    )
  }
})

export default Signup
