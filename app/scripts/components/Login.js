import React from 'react'
import  {hashHistory} from 'react-router'

import store from '../store'
import Modal from './Modal'

const Login = React.createClass({
  getInitialState: function() {
    return {formClasses: 'form-modal login slide-in', error: ''}
  },
  login: function(e) {
    e.preventDefault()
    console.log('this: ', this);
    let username = this.refs.username.value
    let password = this.refs.password.value
    store.session.login(username, password)
    .then(() => {
      this.props.closeModal()
    })
    .catch((errMsg) => {
      console.log('ERROR: ', errMsg);
      this.setState({formClasses: 'form-modal signup shake', error: errMsg})
      window.setTimeout(() => {
        this.setState({formClasses: 'form-modal signup', error: errMsg})
      }, 300)
    })
  },
  render: function() {
    let errorMsg
    let userClasses = 'username'
    let passwordClasses = 'password'
    let verifyPasswordClasses = 'verify-password'

    if (this.state.error) {
      if (this.state.error.indexOf('User') !== -1) {
        userClasses = 'username error'
      } else if (this.state.error.indexOf('Password') !== -1) {
        passwordClasses = 'password error'
      } else if (this.state.error.indexOf('Wrong') !== -1) {
        userClasses = 'username error'
        passwordClasses = 'password error'
      }
      errorMsg = (
        <div className="form-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.error}</h4>
        </div>)
    }

    return (
      <form onSubmit={this.login} className={this.state.formClasses} style={this.props.modalStyles}>
        <h3>Login</h3>
        {errorMsg}
        <div className={userClasses}>
          <input type="text" placeholder="Username" ref="username" autoFocus="true"/>
        </div>
        <div className={passwordClasses}>
          <input type="password" placeholder="Password" ref="password"/>
        </div>
        <input type="submit" id="submit-btn" />
      </form>
    )
  }
})

export default Login
