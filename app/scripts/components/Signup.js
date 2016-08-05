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
    this.props.closeModal()
  },
  checkIfEnter: function(e) {
    if (e.which === 13) {
      this.login()
    }
  },
  render: function() {
    return (
      <form onSubmit={this.signup} className="form-modal signup">
        <h3>Signup</h3>
        <input type="text" placeholder="Username" ref="username"/>
        <input type="password" placeholder="Password" ref="password"/>
        <input type="password" placeholder="Verify Password" ref="verifyPassword"/>
        <input type="submit" id="submit-btn" />
      </form>
    )
  }
})

export default Signup
