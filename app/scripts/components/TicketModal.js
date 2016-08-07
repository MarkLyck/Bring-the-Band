import React from 'react'
import _ from 'underscore'
import $ from 'jquery'



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
    let input = this.refs.cardNumber.value
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      this.refs.cardNumber.value = parts.join(' ')
    } else {
      this.refs.cardNumber.value = v
    }
  },
  dateFormat: function(e) {
    let input = this.refs.cardExpiry.value
    let v = input
    if (e.which !== 8) {
      v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      if (v.length === 1 && v > 1) {
        v = '0' + v
      }
      if (v.length === 2) {
        if (v > 12) {
          let parts = v.split('')
          parts.splice(1, 1)
          v = parts.join('')
        } else {
          v = v + ' / '
        }
      } else if (v.length > 2) {
        let parts = v.split('')
        parts.splice(2, 0, ' / ')
        v = parts.join('')
      }
      if (v.length > 7) {
        let parts = v.split('')
        parts.splice(6, 1)
        v = parts.join('')
      }
    } else {
      v = input
      if (v.length === 4) {
        console.log('DELETE EXTRA');
        let parts = v.split('')
        parts = _.without(parts, '/')
        parts = _.without(parts, ' ')
        parts.splice(1, 1)
        v = parts.join('')
      }

      if (v.length > 2) {
        let parts = v.split('')
        parts = _.without(parts, '/')
        parts = _.without(parts, ' ')
        parts.splice(2, 0, ' / ')
        v = parts.join('')
      }
    }
    this.refs.cardExpiry.value = v
  },
  cvcFormat: function() {
    let input = this.refs.cardCvc.value
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length > 3) {
      let parts = v.split('')
      parts.splice(2, 1)
      v = parts.join('')
    }
    this.refs.cardCvc.value = v
  },
  makePayment: function(e) {
    e.preventDefault()
    let ccNum = this.refs.cardNumber.value.replace(/\s+/g, '')
    let ccMonth = this.refs.cardExpiry.value.split(' / ')[0]
    let ccYear = this.refs.cardExpiry.value.split(' / ')[1]
    let ccCVC = this.refs.cardCvc.value

    console.log(ccNum);
    console.log(ccMonth);
    console.log(ccYear);
    console.log(ccCVC);

    Stripe.setPublishableKey('pk_test_c3GciGfzJPBBTd8238EwfTta');
    Stripe.card.createToken({
      number: ccNum,
      cvc: ccCVC,
      exp_month: ccMonth,
      exp_year: ccYear
    }, (status, response) => {
      console.log('card status: ', status);
      console.log('token: ', response.id);

      $.ajax({
        type: 'POST',
        url: 'https://api.stripe.com/v1/charges',
        headers: {
          Authorization: 'Bearer sk_test_9JK5hwYFl8C0xMDpueYHNGzy'
        },
        data: {
          amount: (this.state.quantity * 30 * 100),
          currency: 'usd',
          source: response.id,
          description: "Charge for madison.garcia@example.com"
        },
        success: (response) => {
          console.log('successful payment: ', response);
        },
        error: (response) => {
          console.log('error payment: ', response);
        }
      })
    });
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
