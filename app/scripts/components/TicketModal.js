import React from 'react'
import _ from 'underscore'
import $ from 'jquery'

import cc from '../cc'
import store from '../store'

const TicketModal = React.createClass({
  getInitialState() {
    return {quantity: 1, error: '', modalClasses: 'get-tickets-container'}
  },
  componentDidMount() {
    this.refs.quantity.value = 1
  },
  setQuantity() {
    if (!isNaN(this.refs.quantity.value)) {
      this.setState({quantity: this.refs.quantity.value})
    } else {
      console.log('NaN');
    }
  },
  ccFormat() {
    this.refs.cardNumber.value = cc.ccFormat(this.refs.cardNumber.value)
  },
  dateFormat(e) {
    this.refs.cardExpiry.value = cc.dateFormat(e, this.refs.cardExpiry.value)
  },
  cvcFormat() {
    this.refs.cardCvc.value = cc.cvcFormat(this.refs.cardCvc.value)
  },
  checkPayment(e) {
    e.preventDefault()
    const card = {
      number: this.refs.cardNumber.value.replace(/\s+/g, ''),
      month: this.refs.cardExpiry.value.split(' / ')[0],
      year: this.refs.cardExpiry.value.split(' / ')[1],
      cvc: this.refs.cardCvc.value,
      email: this.refs.email.value
    }
    cc.checkPayment(card)
      .then((token) => {
        this.chargeCard(token)
      })
      .catch((e) => {
        this.setState({error: e, modalClasses: 'get-tickets-container shake'})
        window.setTimeout(() => {
          this.setState({modalClasses: 'get-tickets-container'})
        }, 300)
      })
  },
  chargeCard(token) {
    console.log('charge card running');
    cc.chargeCard(token, this.state.quantity)
      .then(() => {
        console.log('SUCCESFUL PAYMENT');
        console.log(store.session);
        store.session.set('showModal', 'success-payment')
      })
      .catch((e) => {
        console.log('charge ERROR: ', e);
        this.setState({error: e, modalClasses: 'get-tickets-container shake'})
        window.setTimeout(() => {
          this.setState({modalClasses: 'get-tickets-container'})
        }, 300)
      })
  },
  render() {
    let error;
    if (this.state.error) {
      error = (
        <div className="payment-error">
          <h4><i className="fa fa-exclamation-circle" aria-hidden="true"></i>{this.state.error}</h4>
        </div>)
    }
    return (
      <div className={this.state.modalClasses}>
        {error}
        <div className="content-container">
          <div className="left">
            <div className="tickets-icon"></div>
            <h3 className="buy-tickets">Tickets - $30.00</h3>
            <div className="wrapper">
              <h4>Quantity</h4>
              <input onKeyUp={this.setQuantity} type="text" ref="quantity"/>
            </div>
          </div>

          <div className="right">

            <form onSubmit={this.checkPayment}>
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
      </div>
    )
  }
})

export default TicketModal
