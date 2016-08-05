import React from 'react'
import  {hashHistory} from 'react-router'

import store from '../store'
import Modal from './Modal'

const Login = React.createClass({
  login: function() {
    console.log('this: ', this);
    let username = this.refs.username.value
    let password = this.refs.password.value
    store.session.login(username, password)
    this.props.closeModal()
  },
  render: function() {
    return (
      <form onSubmit={this.login} className="form-modal login">
        <h3>Login</h3>
        <input type="text" placeholder="Username" ref="username"/>
        <input type="password" placeholder="Password" ref="password"/>
        <input type="submit" id="submit-btn" />
      </form>
    )
  }
})

export default Login
