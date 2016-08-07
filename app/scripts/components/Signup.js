import React from 'react'
import  {hashHistory} from 'react-router'
import store from '../store'
import Modal from './Modal'


const Signup = React.createClass({
  signup: function(e) {
    e.preventDefault()
    console.log('this: ', this);
    let username = this.refs.username.value
    let password = this.refs.password.value
    let verifyPassword = this.refs.verifyPassword.value
    store.session.signup(username, password, verifyPassword)
      .then(() => {
        this.props.closeModal()
      })
      .catch(() => {
        console.log('INVALID SIGNUP');
      })

  },
  render: function() {
    return (
      <form onSubmit={this.signup} className="form-modal signup">
        <h3>Signup</h3>
        <div id="username">
          <input type="text" placeholder="Username" ref="username" autoFocus="true"/>
        </div>
        <div id="password">
          <input type="password" placeholder="Password" ref="password"/>
        </div>
        <div id="verify-password">
          <input type="password" placeholder="Verify Password" ref="verifyPassword"/>
        </div>
        <input type="submit" id="submit-btn" />
      </form>
    )
  }
})

export default Signup
