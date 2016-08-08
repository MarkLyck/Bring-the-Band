import React from 'react'
import _ from 'underscore'
import $ from 'jquery'

import cc from '../cc'



const TicketModal = React.createClass({
  getInitialState: function() {
    return {quantity: 1}
  },
  componentDidMount: function() {
    this.refs.quantity.value = 1
  },
  setQuantity: function() {
    if (!isNaN(this.refs.quantity.value)) {
      this.setState({quantity: this.refs.quantity.value})
    } else {
      console.log('NAN');
    }
  },
  ccFormat: function() {
    this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value)
  },
  dateFormat: function(e) {
    this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value)
  },
  cvcFormat: function() {
    this.refs.cardCvc.value =cc.cvcFormat(this.refs.cardCvc.value)
  },
  makePayment: function(e) {
    e.preventDefault()
    const card = {
      number: this.refs.cardNumber.value.replace(/\s+/g, ''),
      month: this.refs.cardExpiry.value.split(' / ')[0],
      year: this.refs.cardExpiry.value.split(' / ')[1],
      cvc: this.refs.cardCvc.value
    }
    cc.makePayment(card, this.state.quantity)
  },
  render: function() {
    return (
      <div className="get-tickets-container">
        <div className="left">
          <div className="tickets-icon"></div>
          <h3 className="buy-tickets">Tickets - $30.00</h3>
          <div className="wrapper">
            <h4>Quantity</h4>
            <input onKeyUp={this.setQuantity} type="text" ref="quantity"/>
          </div>
        </div>

        <div className="right">

          <form onSubmit={this.makePayment}>
            <div className="email input-container">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              <input type="email" placeholder="Email" ref="email"/>
            </div>

            <div className="card-number input-container">
              <i className="fa fa-credit-card" aria-hidden="true"></i>
              <input onKeyUp={this.ccFormat} type="text" placeholder="Card number" ref="cardNumber"/>
            </div>
            <div className="wrapper">
              <div className="card-expiry-month input-container">
                <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                <input onKeyUp={this.dateFormat} type="text" placeholder="MM / YY" ref="cardExpiry"/>
              </div>
              <div className="card-cvc input-container">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input onKeyUp={this.cvcFormat} type="text" placeholder="CVC" ref="cardCvc"/>
              </div>
            </div>

            <input className="pay-button" type="submit" value={`Pay $${(this.state.quantity * 30).toFixed(2)}`}/>
          </form>
        </div>
      </div>
    )
  }
})

export default TicketModal
