import $ from 'jquery'
import React from 'react'
import  {hashHistory} from 'react-router'
import store from '../store'
import Modal from './Modal'

// $.fn.shake = function(intShakes, intDistance, intDuration) {
//     this.each(function() {
//         $(this).css("position","relative");
//         for (var x=1; x<=intShakes; x++) {
//         $(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
//     .animate({left:intDistance}, ((intDuration/intShakes)/2))
//     .animate({left:0}, (((intDuration/intShakes)/4)));
//     }
//   });
// return this;
// };

const Signup = React.createClass({
  getInitialState: function() {
    return {formClasses: 'form-modal signup slide-in'}
  },
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
        console.log('SHAKE');
        this.setState({formClasses: 'form-modal signup shake'})
        window.setTimeout(() => {
          this.setState({formClasses: 'form-modal signup'})
        }, 300)
      })

  },
  render: function() {
    return (
      <form onSubmit={this.signup} className={this.state.formClasses} ref="signupModal">
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
