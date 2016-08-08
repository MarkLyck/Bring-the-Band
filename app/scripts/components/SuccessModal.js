import React from 'react'

import store from '../store'

const SuccessModal = React.createClass({
  render() {
    return (
      <div className="success-modal">
        <i className="fa fa-check-circle" aria-hidden="true"></i>
        <h2>Success</h2>
        <h4>Your tickets have been emailed to: </h4>
        <h4 className="user-email">{store.session.get('email')}</h4>
      </div>
    )
  }
})

export default SuccessModal
